import { Vector3, RenderSide } from '@gl-widget/gl-widget';

class BlinnPhongMaterial {
    constructor(options = {}) {
        this.vertexShader = `
      attribute vec4 position;
      attribute vec4 normal;
      attribute vec2 uv                                                                                                                                                                                                                                                                                                                       ;
      varying vec2 vUv;
      varying vec4 vNormal;
      varying vec4 vPosition;
      uniform mat3 uvTransform;
      uniform mat4 mvpMatrix;
  
      void main () {
        gl_Position = mvpMatrix*position;
        vPosition = gl_Position;
        vNormal = normal;
        vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
      }
    `;
        this.fragmentShader = `
      precision mediump float;
      varying vec4 vPosition;
      varying vec4 vNormal; 
      varying vec2 vUv;
  
      uniform vec3 globalAmbient; //入射环境光颜色
      uniform vec3 lightColor; //灯光颜色
      uniform vec3 lightPosition; //灯光的位置
      uniform vec3 eyePosition;  //摄像机位置
      uniform vec3 Ke;          //Ke是材质的放射光（自发光）颜色
      uniform vec3 Ka;          //Ka是材质的环境反射系数
      uniform vec3 Kd;          //Kd是材质的漫反射颜色
      uniform vec3 Ks;          //Ks是材质的镜面反射颜色
      uniform float shininess;     //材质表面光泽度
      void main() {
  
        vec3 N = vNormal.xyz; 
        vec3 P = vPosition.xyz;
  
        //公式一计算放射光
        vec3 emissive = Ke; 
        
        //公式二计算环境光
        vec3 ambient = Ka * globalAmbient;
        
        //公式三计算漫反射光
        vec3 L = normalize (lightPosition - P); //L为标准化指向灯光的向量。
        float diffuseLight = max(dot(N,L),0.0);   
        vec3 diffuse = Kd * lightColor *diffuseLight;
        
        //公式四计算镜面放射
        vec3 V = normalize(eyePosition - P);
        vec3 H = normalize (L+V);
        float specularLight = pow(max (dot (N,H),0.0), shininess);
        if(dot(N,L) <= 0.0) {
          specularLight = 0.0;
        }
            
        vec3 specular = Ks * lightColor * specularLight ;
        
        // //基本光照模型完成
        vec4 color;
        color.xyz = emissive + ambient + diffuse + specular;
        
        color.w = 1.0;
        gl_FragColor = color;
      }
    `;
        this.uniforms = {
            globalAmbient: {
                value: options.ambient || new Vector3(0, 0, 0)
            },
            lightColor: {
                value: new Vector3(1, 1, 1)
            },
            lightPosition: {
                value: new Vector3(30, 0, 30)
            },
            eyePosition: {
                value: new Vector3(0, 0, 30)
            },
            Ke: {
                value: new Vector3(0, 0, 0)
            },
            Ka: {
                value: new Vector3(1, 1, 1)
            },
            Kd: {
                value: new Vector3(1, 1, 1)
            },
            Ks: {
                value: new Vector3(0.1, 0.1, 0.1)
            },
            shininess: {
                value: 32
            }
        };
    }
}

class TextureMaterial {
    constructor(tDiffuse = null) {
        this.transparent = false;
        this.vertexShader = `
      attribute vec4 position;
      attribute vec4 normal;
      attribute vec2 uv;

      varying vec2 vUv;
      uniform mat4 mvpMatrix;
      void main() {
        vUv = uv;
        gl_Position = mvpMatrix * vec4( position );
      }
    `;
        this.fragmentShader = `
      precision mediump float;
      uniform sampler2D tDiffuse;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {

        vec4 texel = texture2D( tDiffuse, vUv );
        gl_FragColor = opacity * texel;
      }
    `;
        this.uniforms = {
            "tDiffuse": { value: tDiffuse },
            "opacity": { value: 1.0 }
        };
        this.side = RenderSide.DOUBLE;
    }
}

var noiseShader = "precision mediump float;\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\nvarying vec3 vPosition;\nvoid main () {\n  float n = cnoise((vPosition.xy) * 12.0);\n  gl_FragColor = vec4(n, n, n, 1.0);\n}\n\n";

class NoiseMaterial {
    constructor() {
        this.transparent = false;
        this.fragmentShader = noiseShader;
        this.uniforms = {};
        this.side = RenderSide.DOUBLE;
    }
}

var physicalVertex = "precision highp float;\nprecision highp int;\n\n#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform bool isOrthographic;\n\n#ifdef USE_INSTANCING\n attribute mat4 instanceMatrix;\n#endif\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n#ifdef USE_TANGENT\n\tattribute vec4 tangent;\n#endif\n#ifdef USE_COLOR\n\tattribute vec3 color;\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n\n\nbool isPerspectiveMatrix( mat4 m ) {\n  return m[ 2 ][ 3 ] == - 1.0;\n}\n#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif\n\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif\n\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif\n#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif\n#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif\n\nvoid main() {\n\n#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif\n#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif\n\n\n#ifdef USE_COLOR\n\tvColor = color;\n#endif\n\n\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif\n\nvec3 objectNormal = vec3( normal );\nvec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\ttransformedNormal = mat3( instanceMatrix ) * transformedNormal;\n#endif\n  transformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = normalMatrix * objectTangent;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\n\nvec3 transformed = vec3( position );\n#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif\nvec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\nmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;\n#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif\n\n\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif\n\nvViewPosition = - mvPosition.xyz;\n\n#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif\n}";

class PhysicalMaterial {
    constructor(options = {}) {
        this.transparent = false;
        this.vertexShader = this.getVertexShader(options);
        this.fragmentShader = '';
        this.uniforms = {};
        this.side = RenderSide.DOUBLE;
    }
    getVertexShader(options) {
        let shaderDefines = [];
        return shaderDefines.join('\n') + physicalVertex;
    }
}

export { BlinnPhongMaterial, NoiseMaterial, PhysicalMaterial, TextureMaterial };
//# sourceMappingURL=index.esm.js.map

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@gl-widget/gl-widget')) :
  typeof define === 'function' && define.amd ? define(['exports', '@gl-widget/gl-widget'], factory) :
  (global = global || self, factory(global.materials = {}, global.GlWidget));
}(this, (function (exports, glWidget) { 'use strict';

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
                  value: options.ambient || new glWidget.Vector3(0, 0, 0)
              },
              lightColor: {
                  value: new glWidget.Vector3(1, 1, 1)
              },
              lightPosition: {
                  value: new glWidget.Vector3(30, 0, 30)
              },
              eyePosition: {
                  value: new glWidget.Vector3(0, 0, 30)
              },
              Ke: {
                  value: new glWidget.Vector3(0, 0, 0)
              },
              Ka: {
                  value: new glWidget.Vector3(1, 1, 1)
              },
              Kd: {
                  value: new glWidget.Vector3(1, 1, 1)
              },
              Ks: {
                  value: new glWidget.Vector3(0.1, 0.1, 0.1)
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
          this.side = glWidget.RenderSide.DOUBLE;
      }
  }

  class NoiseMaterial {
      constructor(i) {
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
          this.uniforms = {};
          this.side = glWidget.RenderSide.DOUBLE;
      }
  }

  exports.BlinnPhongMaterial = BlinnPhongMaterial;
  exports.NoiseMaterial = NoiseMaterial;
  exports.TextureMaterial = TextureMaterial;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map

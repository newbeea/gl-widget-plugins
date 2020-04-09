import { RenderSide, Vector3, Matrix4, Encoding } from "@gl-widget/gl-widget";
import { PhysicalMaterialOptions } from "./MaterialOptions";
import physicalVertex from './shader-lib/physical-vertex.glsl'
import physicalFragment from './shader-lib/physical-fragment.glsl'
import { replaceLightNums, unrollLoops, replaceTonemapping, replaceColorspace, replaceClippingPlanes, getToneMappingFunction, getTexelDecodingFunction, getTexelEncodingFunction } from "./utils";
import { ToneMapping } from "./Constants";
class PhysicalMaterial {
  vertexShader: string
  fragmentShader: string
  uniforms: any
  side: RenderSide;
  transparent: boolean = false 
  defines: Array<string> = [];
  parameters: any
  options: PhysicalMaterialOptions
  constructor (options: PhysicalMaterialOptions = {}) {
    
    this.uniforms = {
      diffuse: {
        value: new Vector3(1, 1, 1)
      },
      map: {
        value: null
      },
      envMap: {
        value: null
      },
      normalMap: {
        value: null
      },
      envMapIntensity: {
        value: 1
      },
      opacity: {
        value: 1
      },
      roughness: {
        value: 0
      },
      metalness: {
        value: 1
      },
      flipEnvMap: {
        value: -1
      },
      maxMipLevel: {
        value: 10
      },
      toneMappingExposure: {
        value: 1
      },
      toneMappingWhitePoint: {
        value: 1
      }
    }
    this.options = Object.assign({
      toneMapping: ToneMapping.LinearToneMapping,
      outputEncoding: Encoding.sRGBEncoding
    }, options)
    this.update()
  }
  update (options: PhysicalMaterialOptions = {}) {
    Object.assign(this.options, options)
    this.getParameters()
    this.vertexShader = this.getVertexShader()
    this.fragmentShader = this.getFragmentShader()
  }
  getTextureEncodingFromMap (map) {
    return Encoding.sRGBEncoding
  }
  getParameters () {
    let options = this.options
		this.parameters = {
			defines: this.defines,

			isShaderMaterial: true,

			precision: 'highp',

			instancing: options.isInstanced === true,

			map: !! this.uniforms.map.value,
			// mapEncoding: getTextureEncodingFromMap( material.map ),

			envMap: !! this.uniforms.envMap.value,
			// envMapMode: envMap && envMap.mapping,
			envMapEncoding: this.getTextureEncodingFromMap( this.uniforms.envMap.value ),
			envMapCubeUV: true,
      outputEncoding: this.options.outputEncoding,
			normalMap: !! this.uniforms.normalMap.value,
			objectSpaceNormalMap: false,
			tangentSpaceNormalMap: true,
			// clearcoatNormalMap: !! this.uniforms.clearcoatNormalMap.value,
			// displacementMap: !! this.uniforms.displacementMap.value,
			// roughnessMap: !! this.uniforms.roughnessMap.value,
			// metalnessMap: !! this.uniforms.metalnessMap.value,
			// specularMap: !! this.uniforms.specularMap.value,
			// alphaMap: !! this.uniforms.alphaMap.value,

			// gradientMap: !! this.uniforms.gradientMap.value,

			// sheen: !! this.uniforms.sheen.value,

	
      vertexUvs: true,
      uvsVertexOnly: false,
      fog: !! options.fog,
			useFog: options.fog,
			fogExp2: true,

			flatShading: options.flatShading,

			// sizeAttenuation: material.sizeAttenuation,
			logarithmicDepthBuffer: false,


			// numDirLights: lights.directional.length,
			// numPointLights: lights.point.length,
			// numSpotLights: lights.spot.length,
			// numRectAreaLights: lights.rectArea.length,
			// numHemiLights: lights.hemi.length,

			// numDirLightShadows: lights.directionalShadowMap.length,
			// numPointLightShadows: lights.pointShadowMap.length,
			// numSpotLightShadows: lights.spotShadowMap.length,

			// numClippingPlanes: nClipPlanes,
			// numClipIntersection: nClipIntersection,

			dithering: false,

			shadowMapEnabled: false,
			// shadowMapType: renderer.shadowMap.type,

			toneMapping: !!this.options.toneMapping,
			physicallyCorrectLights: false,

			premultipliedAlpha: false,

			alphaTest: false,
			doubleSided: this.options.side == RenderSide.DOUBLE,
			flipSided: false,

			depthPacking: false,

			index0AttributeName: undefined,
		};

	};
  getFragmentShader() {
    let envMapTypeDefine = 'ENVMAP_TYPE_CUBE'
    let envMapModeDefine = 'ENVMAP_MODE_REFLECTION'
    let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE'
    let parameters = this.parameters
    let shaderDefines = [
      '#extension GL_OES_standard_derivatives : enable',
      '#extension GL_EXT_shader_texture_lod : enable',
      'precision highp float;',
      'precision highp int;',
      '#define STANDARD',
      '#define PHYSICAL',
      '#define GAMMA_FACTOR 2',
      '#define TEXTURE_LOD_EXT',
      parameters.toneMapping ? '#define TONE_MAPPING' : '',
      parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
      parameters.map ? '#define USE_MAP' : '',
			parameters.envMap ? '#define USE_ENVMAP' : '',
			parameters.envMap ? '#define ' + envMapTypeDefine : '',
			parameters.envMap ? '#define ' + envMapModeDefine : '',
			parameters.envMap ? '#define ' + envMapBlendingDefine : '',
    ]
    let defineString = shaderDefines.join('\n')
    let fragmentShader = physicalFragment
    fragmentShader = replaceLightNums(fragmentShader, {
      // numDirLightShadows: 3
    })
    fragmentShader = unrollLoops(fragmentShader)
    let toneMappingFunction = getToneMappingFunction(this.options.toneMapping)
    fragmentShader = replaceTonemapping(fragmentShader, toneMappingFunction)

    fragmentShader = replaceColorspace(fragmentShader, `
      // ${getTexelDecodingFunction('matcapTexelToLinear', parameters.envMapEncoding)}
      ${getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding)}
      // ${getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.envMapEncoding)}
      // ${getTexelDecodingFunction('lightMapTexelToLinear', parameters.envMapEncoding)}
      ${getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding)}
    `)
    
    fragmentShader = replaceClippingPlanes(fragmentShader, 0, 0)
    return defineString + fragmentShader
  }
  getVertexShader() {
    let parameters = this.parameters
    let envMapModeDefine = 'ENVMAP_MODE_REFLECTION'

    let shaderDefines = [
      'precision highp float;',
      'precision highp int;',
      '#define HIGH_PRECISION',
      '#define STANDARD',
      '#define PHYSICAL',
  
      parameters.doubleSided ? '#define DOUBLE_SIDED' : '',
      parameters.map ? '#define USE_MAP' : '',
      parameters.envMap ? '#define USE_ENVMAP' : '',
      parameters.envMap ? '#define ' + envMapModeDefine : '',
    ]
    let defineString = shaderDefines.join('\n')
    let vertexShader = physicalVertex
    vertexShader = replaceLightNums(vertexShader, {
      // numDirLightShadows: 3
    })
    vertexShader = unrollLoops(vertexShader)

    return defineString + vertexShader
  }
  
}
export {
  PhysicalMaterial
}
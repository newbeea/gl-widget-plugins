import { RenderSide, Vector3, Matrix4 } from "@gl-widget/gl-widget";
import { PhysicalMaterialOptions } from "./MaterialOptions";
import physicalVertex from './shader-lib/physical-vertex.glsl'
import physicalFragment from './shader-lib/physical-fragment.glsl'
import { replaceLightNums, unrollLoops, replaceTonemapping, replaceColorspace, replaceClippingPlanes } from "./utils";
class PhysicalMaterial {
  vertexShader: string
  fragmentShader: string
  uniforms: any
  side: RenderSide;
  transparent = false 
  constructor (options: PhysicalMaterialOptions = {}) {
    this.vertexShader = this.getVertexShader(options)
    this.fragmentShader = this.getFragmentShader(options)
    this.uniforms = {
      diffuse: {
        value: new Vector3(1, 0, 0)
      },
      env: {
        value: null
      }
    }
    this.side = RenderSide.DOUBLE

  }
  getFragmentShader(options: PhysicalMaterialOptions) {
    let shaderDefines = [
      '#extension GL_OES_standard_derivatives : enable',
      'precision highp float;',
      'precision highp int;',
      '#define USE_COLOR'
    ]
    let defineString = shaderDefines.join('\n')
    let fragmentShader = physicalFragment
    fragmentShader = replaceLightNums(fragmentShader, {
      // numDirLightShadows: 3
    })
    fragmentShader = unrollLoops(fragmentShader)
    fragmentShader = replaceTonemapping(fragmentShader, `
      vec3 toneMapping( vec3 color ) { return LinearToneMapping( color ); }
    `)

    fragmentShader = replaceColorspace(fragmentShader, `
      vec4 mapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
      vec4 matcapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
      vec4 envMapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
      vec4 emissiveMapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
      vec4 lightMapTexelToLinear( vec4 value ) { return LinearToLinear( value ); }
      vec4 linearToOutputTexel( vec4 value ) { return LinearToLinear( value ); }
    `)
    
    fragmentShader = replaceClippingPlanes(fragmentShader, 0, 0)
    
    console.log(fragmentShader)
    return defineString + fragmentShader
  }
  getVertexShader(options: PhysicalMaterialOptions) {
    let shaderDefines = [
      '#extension GL_OES_standard_derivatives : enable',
      'precision highp float;',
      '#define USE_COLOR'
    ]
    let defineString = shaderDefines.join('\n')
    let vertexShader = physicalVertex
    vertexShader = replaceLightNums(vertexShader, {
      // numDirLightShadows: 3
    })
    vertexShader = unrollLoops(vertexShader)
    console.log(vertexShader)
    return defineString + vertexShader
  }
}
export {
  PhysicalMaterial
}
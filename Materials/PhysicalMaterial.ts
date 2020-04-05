import { RenderSide } from "@gl-widget/gl-widget";
import { PhysicalMaterialOptions } from "./MaterialOptions";
// import noiseShader from './shader-lib/noise.glsl'
class PhysicalMaterial {
  vertexShader: string
  fragmentShader: string
  uniforms: any
  side: RenderSide;
  transparent = false 
  constructor (options: PhysicalMaterialOptions = {}) {
    this.vertexShader = this.getVertexShader(options)
    this.fragmentShader = ''
    this.uniforms = {


    }
    this.side = RenderSide.DOUBLE

  }
  getVertexShader(options: PhysicalMaterialOptions) {
    let shaderDefines = [

    ]
    return shaderDefines.join('\n')
  }
}
export {
  PhysicalMaterial
}
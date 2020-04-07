import { RenderSide } from "@gl-widget/gl-widget";
import { PhysicalMaterialOptions } from "./MaterialOptions";
import physicalVertex from './shader-lib/physical-vertex.glsl'
import { replaceLightNums, unrollLoops } from "./utils";
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
    let defineString = shaderDefines.join('\n')
    let vertexShader = physicalVertex
    vertexShader = replaceLightNums(vertexShader, {
      numDirLightShadows: 3
    })
    vertexShader = unrollLoops(vertexShader)
    console.log(vertexShader)
    return defineString + vertexShader
  }
}
export {
  PhysicalMaterial
}
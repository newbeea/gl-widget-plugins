import { RenderSide } from "@gl-widget/gl-widget";

import noiseShader from './shader-lib/noise.glsl'
class NoiseMaterial {
  vertexShader: string
  fragmentShader: string
  uniforms: any
  side: RenderSide;
  transparent = false 
  constructor () {

   this.fragmentShader = noiseShader
    this.uniforms = {

    }
    let a = []
    this.side = RenderSide.DOUBLE

  }
}
export {
  NoiseMaterial
}
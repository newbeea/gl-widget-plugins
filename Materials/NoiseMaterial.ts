import { RenderSide } from "@gl-widget/gl-widget";


class NoiseMaterial {
  vertexShader: string
  fragmentShader:string
  uniforms: any
  side: RenderSide;
  transparent = false 
  constructor (i?) {
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
    `
   this.fragmentShader = `
      precision mediump float;
      uniform sampler2D tDiffuse;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {

        vec4 texel = texture2D( tDiffuse, vUv );
        gl_FragColor = opacity * texel;
      }
    `
    this.uniforms = {


    }
    this.side = RenderSide.DOUBLE

  }
}
export {
  NoiseMaterial
}
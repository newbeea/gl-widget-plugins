import { Texture } from "@gl-widget/gl-widget";

class CopyShader {
  vertexShader: string
  fragmentShader:string
  uniforms: any
  transparent = false 
  constructor (diffuseMap: Texture = null) {
    this.vertexShader = `
      attribute vec3 position;
      attribute vec2 uv;

      varying vec2 vUv;
      uniform mat4 mvpMatrix;
      void main() {
        vUv = uv;
        gl_Position = mvpMatrix * vec4( position, 1. );
      }
    `
   this.fragmentShader = `
      precision mediump float;
      uniform sampler2D diffuseMap;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D( diffuseMap, vUv );
        gl_FragColor = texel;
      }
    `
    this.uniforms = {
      "diffuseMap": { value: diffuseMap },
    }
  }
}
export default CopyShader
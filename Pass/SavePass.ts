import { ShaderPass } from "./ShaderPass";

class SavePass extends ShaderPass {
  constructor() {
    let shader = {
      vertexShader: `
        attribute vec3 position;
        attribute vec2 uv;

        varying vec2 vUv;
        uniform mat4 mvpMatrix;
        void main() {
          vUv = uv;
          gl_Position = vec4( position, 1. );
        }
      `,
        
      fragmentShader: `
        precision mediump float;
        uniform sampler2D diffuseMap;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D( diffuseMap, vUv );
          gl_FragColor = texel;//vec4(vUv.y);
        }
      `,
      uniforms: {
        "diffuseMap": { value: null },
      }
    }
    super(shader)
  }
}

export { SavePass }
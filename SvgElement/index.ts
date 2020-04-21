


import { RenderableElement } from '@gl-widget/gl-widget'
import { SvgGeometry } from './SvgGeometry'
class SvgElement extends RenderableElement {
	data: any;
	constructor(material, node, options) {
    material = Object.assign({
      vertexShader: `
        attribute vec4 position;
        attribute vec2 uv                                                                                                                                                                                                                                                                                                                       ;
        varying vec2 vUv;
        uniform mat3 uvTransform;
        uniform mat4 mvpMatrix;
        void main () {
          gl_Position = mvpMatrix*position;
          vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
        }
      `
    }, material)
    super(material, new SvgGeometry(node, options));
    if (options.scale) {
      if (options.scale.x) {
        this.scale.set(options.scale.x, options.scale.y, 1)
      } else {
        this.scale.set(options.scale, options.scale, 1)
      }
      
    }
    console.log(options)
    
  }
}

export default SvgElement



import { Pass, BufferGeometry, Uint32Attribute, Float32Attribute } from "@gl-widget/gl-widget";
import { RenderableElement } from "@gl-widget/gl-widget";
import { GLWidget } from "@gl-widget/gl-widget";
import { OrthographicCamera } from "@gl-widget/gl-widget";
import { Texture } from "@gl-widget/gl-widget";
import { RenderTarget } from "@gl-widget/gl-widget";

class ShaderPass extends Pass {
  camera: OrthographicCamera;
  textureID: string;
  uniforms: any;
  fullScreenQuad: RenderableElement;
  texture: Texture;
  h: WeakMap<any, any>;
  constructor (shader, textureID = 'diffuseMap') {
    super()

    this.textureID = textureID

    this.uniforms = shader.uniforms;
    this.camera = new OrthographicCamera( - 1, 1, 1, - 1, -1, 1 )
    let geometry = new BufferGeometry()
      geometry.addAttribute('position', new Float32Attribute([
        1, -1, 0,
        1, 1, 0,
        -1, 1, 0,
        -1, -1, 0
       
      ], 3))
      geometry.addAttribute('uv', new Float32Attribute([
        1, 0,
        1, 1,
        0, 1,
        0, 0
       
      ], 2))
      geometry.addAttribute('index', new Uint32Attribute([
        0, 1, 2, 2, 3, 0
      ], 1))
    this.fullScreenQuad = new RenderableElement(
      shader, 
      geometry
    )
    this.uniforms[ this.textureID ].value = this.texture
  }
  render ( glWidget: GLWidget, writeBuffer: RenderTarget, readBuffer: RenderTarget /*, deltaTime, maskActive */ ) {

		if ( this.uniforms[ this.textureID ] ) {
      this.uniforms[ this.textureID ].value = readBuffer.texture
    }
    
    
		if ( this.renderToScreen ) {
      
      glWidget.setRenderTarget( null );
      glWidget.clear()
			glWidget.renderElement(this.fullScreenQuad, this.camera)

		} else {

			glWidget.setRenderTarget( writeBuffer );
			// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
			// if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			glWidget.renderElement(this.fullScreenQuad, this.camera)
		}

	}
}
export {
  ShaderPass
}
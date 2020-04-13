import { Pass, GLWidget } from "@gl-widget/gl-widget";
import { Object3D, Background, Renderer } from "@gl-widget/gl-widget";
import { Camera } from "@gl-widget/gl-widget";

class RenderPass extends Pass {

	needsSwap: boolean;
  constructor() {
    super()
		this.needsSwap = false;
  }
  render ( glWidget: GLWidget, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		// var oldAutoClear = renderer.autoClear;
		// renderer.autoClear = false;

		// this.scene.overrideMaterial = this.overrideMaterial;

		// var oldClearColor, oldClearAlpha;

		// if ( this.clearColor ) {

		// 	oldClearColor = renderer.getClearColor().getHex();
		// 	oldClearAlpha = renderer.getClearAlpha();

		// 	renderer.setClearColor( this.clearColor, this.clearAlpha );

		// }

		// if ( this.clearDepth ) {

		// 	renderer.clearDepth();

		// }
   		// console.log(this.renderToScreen)
		glWidget.setRenderTarget( this.renderToScreen ? null : readBuffer );

		// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
		// if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
		glWidget.renderFrame();
    
		// if ( this.clearColor ) {

		// 	renderer.setClearColor( oldClearColor, oldClearAlpha );

		// }

		// this.scene.overrideMaterial = null;
		// renderer.autoClear = oldAutoClear;

	}
}
export {
  RenderPass
}
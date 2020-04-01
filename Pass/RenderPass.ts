import { Pass } from "../../../Pass";
import { Object3D, Background, Renderer } from "../../../Renderer";
import { Camera } from "../../../cameras/Camera";

class RenderPass extends Pass {
  background: Background;
  camera: Camera;
  scene: Object3D;
  constructor(background: Background, scene: Object3D, camera: Camera) {
    super()
    this.background = background
    this.scene = scene;
	this.camera = camera;
	this.needsSwap = false;

  }
  render ( renderer: Renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

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
		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );

		// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
		// if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
		renderer.render(this.background, this.scene, this.camera, true );
    
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
import { Vector3 } from "@gl-widget/gl-widget";
import { Light } from "./Light";
class DirectionalLight extends Light {
  direction: Vector3 = new Vector3(1, 1, 1)
  constructor(
    public color: Vector3 = new Vector3(1, 1, 1), 
    public position: Vector3 = new Vector3(1, 1, 1), 
    public target: Vector3 = new Vector3(), 

  ) {
      super()
      this.uniformName = 'directionalLights'
  }
  clone () {
    return new DirectionalLight(this.color.clone(), this.position.clone(), this.target.clone())
  }
}
export { DirectionalLight }
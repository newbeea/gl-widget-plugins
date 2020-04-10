import { Vector3 } from "@gl-widget/gl-widget";
import { Light } from "./Light";
class PointLight extends Light {

  constructor(
    public color: Vector3 = new Vector3(1, 1, 1), 
    public position: Vector3 = new Vector3(), 
    public distance: number = 10, 
    public decay: number = 1, 

    ) {
      super()
      this.uniformName = 'pointLights'
  }
  clone () {
    return new PointLight(this.color.clone(), this.position.clone(), this.distance, this.decay)
  }
}
export { PointLight }
import { Vector3, Camera } from "@gl-widget/gl-widget";
import { Light } from "./Light";
import { PointLight } from "./PointLight";
import { DirectionalLight } from "./DirectionalLight";
class Lights {
  cache: WeakMap<Light, Light> = new WeakMap()
  uniforms: any = {
    pointLights: {
      value:[]
    },
    directionalLights: {
      value:[]
    }
  }
  constructor(
    private lights: any[] = []
  ) {
    this.lights.forEach((light: Light) => {
      let l = light.clone()
      this.cache.set(l, light)
      this.uniforms[light.uniformName].value.push(l)
    })
  }
  addLight(light: Light) {
    let l = light.clone()
    this.cache.set(l, light)
    this.uniforms[light.uniformName].value.push(l)
  }
  removeLight(light: Light) {
    let list = this.uniforms[light.uniformName].value
    let uniformNames = Object.keys(this.uniforms)
    uniformNames.forEach(name => {
      let lights = this.uniforms[name].value
      let index = -1
      for (let i = 0; i < lights.length; i++) {
        if (this.cache.get(lights[i]) == light) {
          index = i;
          
          break
        }
      }
      if (index >=0) {
        this.cache.delete(lights[index])
        lights.splice(index, 1);
      }
    })

  }
  update(camera: Camera) {
    let pointLights = this.uniforms.pointLights.value
    pointLights.forEach((light: PointLight) => {
      let original: PointLight = <PointLight> this.cache.get(light)
      light.position.copy(original.position).applyMatrix4(camera.matrixWorldInverse)
      light.color.copy(original.color)
    })
    let directionalLights = this.uniforms.directionalLights.value
    
    directionalLights.forEach((light: DirectionalLight) => {
      let original: DirectionalLight = <DirectionalLight> this.cache.get(light)
      light.direction.copy( original.position );
      light.direction.sub( original.target );
      light.direction.transformDirection( camera.matrixWorldInverse );
      light.color.copy(original.color)
        
    })
  }
}
export { Lights }
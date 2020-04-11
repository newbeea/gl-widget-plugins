import { RenderSide, Encoding, Texture, Vector3, Vector2 } from "@gl-widget/gl-widget";
import { ToneMapping } from "./Constants";




export interface PhysicalMaterialOptions {
  color?: string,
  isInstanced?: boolean,
  fog?: boolean,
  side?: RenderSide,
  flatShading?: boolean,
  toneMapping?: ToneMapping,
  outputEncoding?: Encoding,
  sheen?: Vector3,
  toneMappingExposure?: number,
  toneMappingWhitePoint?: number,
  maxMipLevel?: number,
  flipEnvMap?: boolean,
  metalness?: number,
  roughness?: number,
  opacity?: number,
  envMapIntensity?: number,
  normalScale?: Vector2,
  emissiveMap?: Texture,
  emissive?: Vector3,
  diffuse?: Vector3,
  ambientLightColor?: Vector3,
  map?: Texture,
  envMap?: Texture,
  normalMap?: Texture,
  aoMap?: Texture,
  specularMap?: Texture,
  roughnessMap?: Texture,
  metalnessMap?: Texture,
  offset?: Vector2,
  repeat?: Vector2,
  center?: Vector2,
  rotation?: number
}
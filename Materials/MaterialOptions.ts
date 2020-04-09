import { RenderSide, Encoding } from "@gl-widget/gl-widget";
import { ToneMapping } from "./Constants";

export interface PhysicalMaterialOptions {
  color?: string,
  isInstanced?: boolean,
  fog?: boolean,
  side?: RenderSide,
  flatShading?: boolean,
  toneMapping?: ToneMapping,
  outputEncoding?: Encoding
}
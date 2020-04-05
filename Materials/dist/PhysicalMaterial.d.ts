import { RenderSide } from "@gl-widget/gl-widget";
import { PhysicalMaterialOptions } from "./MaterialOptions";
declare class PhysicalMaterial {
    vertexShader: string;
    fragmentShader: string;
    uniforms: any;
    side: RenderSide;
    transparent: boolean;
    constructor(options?: PhysicalMaterialOptions);
    getVertexShader(options: PhysicalMaterialOptions): string;
}
export { PhysicalMaterial };

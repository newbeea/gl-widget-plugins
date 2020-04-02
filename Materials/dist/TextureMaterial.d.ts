import { RenderSide, Texture } from "@gl-widget/gl-widget";
declare class TextureMaterial {
    vertexShader: string;
    fragmentShader: string;
    uniforms: any;
    side: RenderSide;
    transparent: boolean;
    constructor(tDiffuse?: Texture);
}
export default TextureMaterial;

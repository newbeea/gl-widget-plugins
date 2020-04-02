import { RenderSide } from "@gl-widget/gl-widget";
declare class NoiseMaterial {
    vertexShader: string;
    fragmentShader: string;
    uniforms: any;
    side: RenderSide;
    transparent: boolean;
    constructor(i?: any);
}
export { NoiseMaterial };

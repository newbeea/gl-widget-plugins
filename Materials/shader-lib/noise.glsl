precision mediump float;
@import "../shader-chunk/noise.glsl";
varying vec3 vPosition;
void main () {
  float n = cnoise((vPosition.xy) * 12.0);
  gl_FragColor = vec4(n, n, n, 1.0);
}


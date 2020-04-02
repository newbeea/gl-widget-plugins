precision mediump float;
#pragma glslify: noise = require('../shader-chunk/noise')
varying vec3 vPosition;
void main () {
  float n = noise((vPosition.xy) * 12.0);
  gl_FragColor = vec4(n, n, n, 1.0);
}
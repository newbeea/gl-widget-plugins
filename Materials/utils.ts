function replaceLightNums(string, parameters) {
  return string
    .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights || 0)
    .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights || 0)
    .replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights || 0)
    .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights || 0)
    .replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights || 0)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows || 0)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows || 0)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows || 0);
}

function unrollLoops(string) {
  var loopPattern = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
  return string.replace(loopPattern, loopReplacer);
}

function loopReplacer(match, start, end, snippet) {
  var string = '';
  for (var i = parseInt(start); i < parseInt(end); i++) {
    string += snippet
      .replace(/\[ i \]/g, '[ ' + i + ' ]')
      .replace(/UNROLLED_LOOP_INDEX/g, i);
  }
  return string;
}

export {
  replaceLightNums,
  unrollLoops
}
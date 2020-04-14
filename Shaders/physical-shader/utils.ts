import { ToneMapping } from './Constants'
import { Encoding } from "@gl-widget/gl-widget";
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


function replaceTonemapping (string, functionString) {
  return string.replace(/#pragma TONEMAPPING_FUNCTION/g, functionString)
}
function replaceColorspace (string, functionString) {
  return string.replace(/#pragma COLORSPACE_FUNCTIONS/g, functionString)
}
function replaceClippingPlanes (string, clippingPlanes, clipIntersections) {
  return string
  .replace(/NUM_CLIPPING_PLANES/g, clippingPlanes)
  .replace(/UNION_CLIPPING_PLANES/g, clipIntersections)
  
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

function getEncodingComponents( encoding: Encoding ) {

	switch ( encoding ) {

		case Encoding.LinearEncoding:
			return [ 'Linear', '( value )' ];
		case Encoding.sRGBEncoding:
			return [ 'sRGB', '( value )' ];
		case Encoding.RGBEEncoding:
			return [ 'RGBE', '( value )' ];
		case Encoding.RGBM7Encoding:
			return [ 'RGBM', '( value, 7.0 )' ];
		case Encoding.RGBM16Encoding:
			return [ 'RGBM', '( value, 16.0 )' ];
		case Encoding.RGBDEncoding:
			return [ 'RGBD', '( value, 256.0 )' ];
		case Encoding.GammaEncoding:
			return [ 'Gamma', '( value, float( GAMMA_FACTOR ) )' ];
		case Encoding.LogLuvEncoding:
			return [ 'LogLuv', '( value )' ];
		default:
			return [ 'Linear', '( value )' ];

	}

}

function getTexelDecodingFunction( functionName, encoding ) {

	var components = getEncodingComponents( encoding );
	return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[ 0 ] + 'ToLinear' + components[ 1 ] + '; }';

}

function getTexelEncodingFunction( functionName, encoding ) {

	var components = getEncodingComponents( encoding );
	return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[ 0 ] + components[ 1 ] + '; }';

}

function getToneMappingFunction( toneMapping: ToneMapping ) {

	var toneMappingName;

	switch ( toneMapping ) {

		case ToneMapping.LinearToneMapping:
			toneMappingName = 'Linear';
			break;

		case ToneMapping.ReinhardToneMapping:
			toneMappingName = 'Reinhard';
			break;

		case ToneMapping.Uncharted2ToneMapping:
			toneMappingName = 'Uncharted2';
			break;

		case ToneMapping.CineonToneMapping:
			toneMappingName = 'OptimizedCineon';
			break;

		case ToneMapping.ACESFilmicToneMapping:
			toneMappingName = 'ACESFilmic';
			break;

		default:
			return ''

	}

	return 'vec3 toneMapping( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

}
export {
  replaceLightNums,
  replaceTonemapping,
  replaceColorspace,
  replaceClippingPlanes,
  unrollLoops,
  getToneMappingFunction,
  getTexelDecodingFunction,
  getTexelEncodingFunction
}
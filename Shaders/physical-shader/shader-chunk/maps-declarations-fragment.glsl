
#ifdef USE_MAP
	uniform sampler2D map;
#endif

#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif

#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif

#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif

#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif
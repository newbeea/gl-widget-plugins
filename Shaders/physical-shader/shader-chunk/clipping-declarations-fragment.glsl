#if NUM_CLIPPING_PLANES > 0

	#if ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP ) && ! defined( TOON )
		varying vec3 vViewPosition;
	#endif

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
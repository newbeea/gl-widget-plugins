
@import "../shader-chunk/common-declarations-vertex.glsl";
@import "../shader-chunk/uv-declarations-vertex.glsl";
@import "../shader-chunk/displacementmap-declarations-vertex.glsl";
@import "../shader-chunk/color-declarations-vertex.glsl";
@import "../shader-chunk/fog-declarations-vertex.glsl";
@import "../shader-chunk/shadowmap-declarations-vertex.glsl";
@import "../shader-chunk/logdepthbuf-declarations-vertex.glsl";

void main() {
//计算传递UV attribute
#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif

//传递color attribute
#ifdef USE_COLOR
	vColor = color;
#endif


#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif

// 变换传递法线，如果有tangent信息，变换并计算biTangent
vec3 objectNormal = vec3( normal );
vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	transformedNormal = mat3( instanceMatrix ) * transformedNormal;
#endif
  transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif

#ifdef USE_TANGENT
	vec3 transformedTangent = normalMatrix * objectTangent;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif

// 计算位置
vec3 transformed = vec3( position );
#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;

// 自定义深度缓存
#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif


#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif

// shadowmap 展开循环并对shadow coord赋值
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;
	}
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;
	}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;
	}
	#endif
#endif

// 相机空间点坐标
vViewPosition = - mvPosition.xyz;

#ifdef USE_FOG
	fogDepth = -mvPosition.z;
#endif
}
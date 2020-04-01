"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(t=0,i=0,s=0){this.x=t,this.y=i,this.z=s}set(t,i,s){return this.x=t,this.y=i,this.z=s,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}fromArray(t,i){return void 0===i&&(i=0),this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,4*i)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}clone(){return new t(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}crossVectors(t,i){var s=t.x,h=t.y,r=t.z,e=i.x,n=i.y,a=i.z;return this.x=h*a-r*n,this.y=r*e-s*a,this.z=s*n-h*e,this}divideScalar(t){return this.multiplyScalar(1/t)}normalize(){return this.divideScalar(this.length())}applyQuaternion(t){var i=this.x,s=this.y,h=this.z,r=t.x,e=t.y,n=t.z,a=t.w,o=a*i+e*h-n*s,_=a*s+n*i-r*h,u=a*h+r*s-e*i,l=-r*i-e*s-n*h;return this.x=o*a+l*-r+_*-n-u*-e,this.y=_*a+l*-e+u*-r-o*-n,this.z=u*a+l*-n+o*-e-_*-r,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){var h=Math.sin(i)*t;return this.x=h*Math.sin(s),this.y=Math.cos(i)*t,this.z=h*Math.cos(s),this}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){var i=this.x-t.x,s=this.y-t.y,h=this.z-t.z;return i*i+s*s+h*h}}function i(t=0,i=0,s=0,h=1){this._x=t,this._y=i,this._z=s,this._w=void 0!==h?h:1}var s,h,r,e;Object.assign(i,{slerp:function(t,i,s,h){return s.copy(t).slerp(i,h)},slerpFlat:function(t,i,s,h,r,e,n){var a=s[h+0],o=s[h+1],_=s[h+2],u=s[h+3],l=r[e+0],y=r[e+1],c=r[e+2],x=r[e+3];if(u!==x||a!==l||o!==y||_!==c){var z=1-n,d=a*l+o*y+_*c+u*x,w=d>=0?1:-1,m=1-d*d;if(m>Number.EPSILON){var f=Math.sqrt(m),p=Math.atan2(f,d*w);z=Math.sin(z*p)/f,n=Math.sin(n*p)/f}var g=n*w;if(a=a*z+l*g,o=o*z+y*g,_=_*z+c*g,u=u*z+x*g,z===1-n){var C=1/Math.sqrt(a*a+o*o+_*_+u*u);a*=C,o*=C,_*=C,u*=C}}t[i]=a,t[i+1]=o,t[i+2]=_,t[i+3]=u}}),Object.defineProperties(i.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(i.prototype,{set:function(t,i,s,h){return this._x=t,this._y=i,this._z=s,this._w=h,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,i){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var s=t._x,h=t._y,r=t._z,e=t.order,n=Math.cos,a=Math.sin,o=n(s/2),_=n(h/2),u=n(r/2),l=a(s/2),y=a(h/2),c=a(r/2);return"XYZ"===e?(this._x=l*_*u+o*y*c,this._y=o*y*u-l*_*c,this._z=o*_*c+l*y*u,this._w=o*_*u-l*y*c):"YXZ"===e?(this._x=l*_*u+o*y*c,this._y=o*y*u-l*_*c,this._z=o*_*c-l*y*u,this._w=o*_*u+l*y*c):"ZXY"===e?(this._x=l*_*u-o*y*c,this._y=o*y*u+l*_*c,this._z=o*_*c+l*y*u,this._w=o*_*u-l*y*c):"ZYX"===e?(this._x=l*_*u-o*y*c,this._y=o*y*u+l*_*c,this._z=o*_*c-l*y*u,this._w=o*_*u+l*y*c):"YZX"===e?(this._x=l*_*u+o*y*c,this._y=o*y*u+l*_*c,this._z=o*_*c-l*y*u,this._w=o*_*u-l*y*c):"XZY"===e&&(this._x=l*_*u-o*y*c,this._y=o*y*u-l*_*c,this._z=o*_*c+l*y*u,this._w=o*_*u+l*y*c),!1!==i&&this.onChangeCallback(),this},setFromAxisAngle:function(t,i){var s=i/2,h=Math.sin(s);return this._x=t.x*h,this._y=t.y*h,this._z=t.z*h,this._w=Math.cos(s),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var i,s=t.elements,h=s[0],r=s[4],e=s[8],n=s[1],a=s[5],o=s[9],_=s[2],u=s[6],l=s[10],y=h+a+l;return y>0?(i=.5/Math.sqrt(y+1),this._w=.25/i,this._x=(u-o)*i,this._y=(e-_)*i,this._z=(n-r)*i):h>a&&h>l?(i=2*Math.sqrt(1+h-a-l),this._w=(u-o)/i,this._x=.25*i,this._y=(r+n)/i,this._z=(e+_)/i):a>l?(i=2*Math.sqrt(1+a-h-l),this._w=(e-_)/i,this._x=(r+n)/i,this._y=.25*i,this._z=(o+u)/i):(i=2*Math.sqrt(1+l-h-a),this._w=(n-r)/i,this._x=(e+_)/i,this._y=(o+u)/i,this._z=.25*i),this.onChangeCallback(),this},setFromUnitVectors:(h=new t,function(i,r){return void 0===h&&(h=new t),(s=i.dot(r)+1)<1e-6?(s=0,Math.abs(i.x)>Math.abs(i.z)?h.set(-i.y,i.x,0):h.set(0,-i.z,i.y)):h.crossVectors(i,r),this._x=h.x,this._y=h.y,this._z=h.z,this._w=s,this.normalize()}),inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,i)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,i){var s=t._x,h=t._y,r=t._z,e=t._w,n=i._x,a=i._y,o=i._z,_=i._w;return this._x=s*_+e*n+h*o-r*a,this._y=h*_+e*a+r*n-s*o,this._z=r*_+e*o+s*a-h*n,this._w=e*_-s*n-h*a-r*o,this.onChangeCallback(),this},slerp:function(t,i){if(0===i)return this;if(1===i)return this.copy(t);var s=this._x,h=this._y,r=this._z,e=this._w,n=e*t._w+s*t._x+h*t._y+r*t._z;if(n<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,n=-n):this.copy(t),n>=1)return this._w=e,this._x=s,this._y=h,this._z=r,this;var a=Math.sqrt(1-n*n);if(Math.abs(a)<.001)return this._w=.5*(e+this._w),this._x=.5*(s+this._x),this._y=.5*(h+this._y),this._z=.5*(r+this._z),this;var o=Math.atan2(a,n),_=Math.sin((1-i)*o)/a,u=Math.sin(i*o)/a;return this._w=e*_+this._w*u,this._x=s*_+this._x*u,this._y=h*_+this._y*u,this._z=r*_+this._z*u,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,i){return void 0===i&&(i=0),this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this.onChangeCallback(),this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),(e=r||(r={}))[e.FRONT=0]="FRONT",e[e.BACK=1]="BACK",e[e.DOUBLE=2]="DOUBLE";class n{constructor(t,i=1,s=1){if(this.state=new Proxy({needsUpdate:!1,version:0},{set:(t,i,s,h)=>{let r=Reflect.set(t,i,s,h);return"needsUpdate"===i&&!0===s&&this.version++,r}}),this.version=0,this.imageLoadedCount=0,this.image=null,this.images=[],t instanceof Array)this.imageCount=t.length,t.forEach(t=>{let i=new Image;i.onload=()=>{this.loadedCallback(),i.onload=null},i.src=t,this.images.push(i)});else if(t){let i=new Image;i.onload=()=>{this.loadedCallback(),i.onload=null},i.src=t,this.image=i,this.imageCount=1}this.format=i,this.type=s,this.needsUpdate=!1,this.glTexture=null}loadedCallback(){this.imageLoadedCount+=1,this.imageLoadedCount==this.imageCount&&(this.state.needsUpdate=!0)}clone(){return new n(void 0).copy(this)}copy(t){return this.image=t.image,this.format=t.format,this.type=t.type,this}}new n;var a;class o{constructor(i,s){this.min=void 0!==i?i:new t(1/0,1/0,1/0),this.max=void 0!==s?s:new t(-1/0,-1/0,-1/0)}}class _{constructor(t,i=!1){this.itemSize=t,this.normalized=i}setXY(t,i,s){return t*=this.itemSize,this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,h){return t*=this.itemSize,this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=h,this}}class u extends _{constructor(t,i,s=!1){super(i,s),t instanceof Float32Array?this.array=t:this.array=new Float32Array(t)}}class l extends _{constructor(t,i,s=!1){super(i,s),t instanceof Uint32Array?this.array=t:this.array=new Uint32Array(t)}}!function(t){t[t.PERSPECTIVE=0]="PERSPECTIVE",t[t.ORTHOGRAPHIC=1]="ORTHOGRAPHIC"}(a||(a={}));exports.SphereGeometry=class extends class{constructor(){this.attributes=new Map,this.index=null,this.boundingBox=new o}addAttribute(t,i){"index"===t?this.index=i:this.attributes.set(t,i)}}{constructor(t){super(),this.indices=[],this.uvs=[],this.positions=[],this.normals=[],this.generateGeometry(t)}generateGeometry(i){let{radius:s=1,widthSegments:h=16,heightSegments:r=16,phiStart:e=0,phiLength:n=2*Math.PI,thetaStart:a=0,thetaLength:o=Math.PI}=i;h=Math.max(3,Math.floor(h)),r=Math.max(2,Math.floor(r)),e=void 0!==e?e:0,n=void 0!==n?n:2*Math.PI,a=void 0!==a?a:0,o=void 0!==o?o:Math.PI;for(var _=a+o,y=(h+1)*(r+1),c=new u(new Float32Array(3*y),3),x=new u(new Float32Array(3*y),3),z=new u(new Float32Array(2*y),2),d=0,w=[],m=new t,f=0;f<=r;f++){for(var p=[],g=f/r,C=0;C<=h;C++){var v=C/h,M=-s*Math.cos(e+v*n)*Math.sin(a+g*o),b=s*Math.cos(a+g*o),A=s*Math.sin(e+v*n)*Math.sin(a+g*o);m.set(M,b,A).normalize(),c.setXYZ(d,M,b,A),x.setXYZ(d,m.x,m.y,m.z),z.setXY(d,v,1-g),p.push(d),d++}w.push(p)}var S=[];for(f=0;f<r;f++)for(C=0;C<h;C++){var k=w[f][C+1],E=w[f][C],F=w[f+1][C],q=w[f+1][C+1];(0!==f||a>0)&&S.push(k,E,q),(f!==r-1||_<Math.PI)&&S.push(E,F,q)}this.addAttribute("position",c),this.addAttribute("normal",x),this.addAttribute("uv",z),this.addAttribute("index",new l(S,1))}};
//# sourceMappingURL=index.cjs.js.map

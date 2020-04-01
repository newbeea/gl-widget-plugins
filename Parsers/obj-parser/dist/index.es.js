var t,e,i=(function(t,e){Object.defineProperty(e,"__esModule",{value:!0});class i{constructor(){this.buffers=new WeakMap}initBuffer(t,e,i){let r=0;for(let[s,n]of i.attributes.entries()){let i=n.array,a=t.createBuffer();if(!a)return console.log("Failed to create the buffer object"),-1;t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW);let h=t.getAttribLocation(e,s);h<0||(t.vertexAttribPointer(h,n.itemSize,t.FLOAT,!1,0,0),t.enableVertexAttribArray(h)),i.length&&(r=i.length/n.itemSize),this.buffers.set(n,a)}if(i.index){let e=t.createBuffer();return e?(t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e),t.bufferData(t.ELEMENT_ARRAY_BUFFER,i.index.array,t.STATIC_DRAW),this.buffers.set(i.index,e),{hasIndex:!0,count:i.index.array.length}):(console.log("Failed to create the buffer object"),-1)}return{hasIndex:!1,count:r}}bindBuffer(t,e,i){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.buffers.get(i.index));for(let[r,s]of i.attributes.entries()){t.bindBuffer(t.ARRAY_BUFFER,this.buffers.get(s));let i=t.getAttribLocation(e,r);i<0||t.vertexAttribPointer(i,s.itemSize,t.FLOAT,!1,0,0)}}}class r{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return this.x=t,this.y=e,this.z=i,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}fromArray(t,e){return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}clone(){return new r(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}crossVectors(t,e){var i=t.x,r=t.y,s=t.z,n=e.x,a=e.y,h=e.z;return this.x=r*h-s*a,this.y=s*n-i*h,this.z=i*a-r*n,this}divideScalar(t){return this.multiplyScalar(1/t)}normalize(){return this.divideScalar(this.length())}applyQuaternion(t){var e=this.x,i=this.y,r=this.z,s=t.x,n=t.y,a=t.z,h=t.w,o=h*e+n*r-a*i,u=h*i+a*e-s*r,l=h*r+s*i-n*e,c=-s*e-n*i-a*r;return this.x=o*h+c*-s+u*-a-l*-n,this.y=u*h+c*-n+l*-s-o*-a,this.z=l*h+c*-a+o*-n-u*-s,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){var r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){var e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}}class s{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,i,r,s,n,a,h,o,u,l,c,d,m,x,f){var _=this.elements;return _[0]=t,_[4]=e,_[8]=i,_[12]=r,_[1]=s,_[5]=n,_[9]=a,_[13]=h,_[2]=o,_[6]=u,_[10]=l,_[14]=c,_[3]=d,_[7]=m,_[11]=x,_[15]=f,this}copy(t){var e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}multiplyMatrices(t,e){var i=t.elements,r=e.elements,s=this.elements,n=i[0],a=i[4],h=i[8],o=i[12],u=i[1],l=i[5],c=i[9],d=i[13],m=i[2],x=i[6],f=i[10],_=i[14],g=i[3],p=i[7],E=i[11],T=i[15],v=r[0],y=r[4],w=r[8],R=r[12],b=r[1],A=r[5],M=r[9],z=r[13],U=r[2],C=r[6],S=r[10],P=r[14],B=r[3],L=r[7],F=r[11],I=r[15];return s[0]=n*v+a*b+h*U+o*B,s[4]=n*y+a*A+h*C+o*L,s[8]=n*w+a*M+h*S+o*F,s[12]=n*R+a*z+h*P+o*I,s[1]=u*v+l*b+c*U+d*B,s[5]=u*y+l*A+c*C+d*L,s[9]=u*w+l*M+c*S+d*F,s[13]=u*R+l*z+c*P+d*I,s[2]=m*v+x*b+f*U+_*B,s[6]=m*y+x*A+f*C+_*L,s[10]=m*w+x*M+f*S+_*F,s[14]=m*R+x*z+f*P+_*I,s[3]=g*v+p*b+E*U+T*B,s[7]=g*y+p*A+E*C+T*L,s[11]=g*w+p*M+E*S+T*F,s[15]=g*R+p*z+E*P+T*I,this}multiply(t){return this.multiplyMatrices(this,t)}makeTranslation(t,e,i){return this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makePerspective(t,e,i,r,s,n){var a=this.elements,h=2*s/(e-t),o=2*s/(i-r),u=(e+t)/(e-t),l=(i+r)/(i-r),c=-(n+s)/(n-s),d=-2*n*s/(n-s);return a[0]=h,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=o,a[9]=l,a[13]=0,a[2]=0,a[6]=0,a[10]=c,a[14]=d,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,i,r,s,n){var a=this.elements,h=1/(e-t),o=1/(i-r),u=1/(n-s),l=(e+t)*h,c=(i+r)*o,d=(n+s)*u;return a[0]=2*h,a[4]=0,a[8]=0,a[12]=-l,a[1]=0,a[5]=2*o,a[9]=0,a[13]=-c,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-d,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}getInverse(t){var e=this.elements,i=t.elements,r=i[0],s=i[1],n=i[2],a=i[3],h=i[4],o=i[5],u=i[6],l=i[7],c=i[8],d=i[9],m=i[10],x=i[11],f=i[12],_=i[13],g=i[14],p=i[15],E=d*g*l-_*m*l+_*u*x-o*g*x-d*u*p+o*m*p,T=f*m*l-c*g*l-f*u*x+h*g*x+c*u*p-h*m*p,v=c*_*l-f*d*l+f*o*x-h*_*x-c*o*p+h*d*p,y=f*d*u-c*_*u-f*o*m+h*_*m+c*o*g-h*d*g,w=r*E+s*T+n*v+a*y;if(0===w)return console.warn("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0"),this.identity();var R=1/w;return e[0]=E*R,e[1]=(_*m*a-d*g*a-_*n*x+s*g*x+d*n*p-s*m*p)*R,e[2]=(o*g*a-_*u*a+_*n*l-s*g*l-o*n*p+s*u*p)*R,e[3]=(d*u*a-o*m*a-d*n*l+s*m*l+o*n*x-s*u*x)*R,e[4]=T*R,e[5]=(c*g*a-f*m*a+f*n*x-r*g*x-c*n*p+r*m*p)*R,e[6]=(f*u*a-h*g*a-f*n*l+r*g*l+h*n*p-r*u*p)*R,e[7]=(h*m*a-c*u*a+c*n*l-r*m*l-h*n*x+r*u*x)*R,e[8]=v*R,e[9]=(f*d*a-c*_*a-f*s*x+r*_*x+c*s*p-r*d*p)*R,e[10]=(h*_*a-f*o*a+f*s*l-r*_*l-h*s*p+r*o*p)*R,e[11]=(c*o*a-h*d*a-c*s*l+r*d*l+h*s*x-r*o*x)*R,e[12]=y*R,e[13]=(c*_*n-f*d*n+f*s*m-r*_*m-c*s*g+r*d*g)*R,e[14]=(f*o*n-h*_*n-f*s*u+r*_*u+h*s*g-r*o*g)*R,e[15]=(h*d*n-c*o*n+c*s*u-r*d*u-h*s*m+r*o*m)*R,this}compose(t,e,i){var r=this.elements,s=e._x,n=e._y,a=e._z,h=e._w,o=s+s,u=n+n,l=a+a,c=s*o,d=s*u,m=s*l,x=n*u,f=n*l,_=a*l,g=h*o,p=h*u,E=h*l,T=i.x,v=i.y,y=i.z;return r[0]=(1-(x+_))*T,r[1]=(d+E)*T,r[2]=(m-p)*T,r[3]=0,r[4]=(d-E)*v,r[5]=(1-(c+_))*v,r[6]=(f+g)*v,r[7]=0,r[8]=(m+p)*y,r[9]=(f-g)*y,r[10]=(1-(c+x))*y,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){var n=new r,a=new s,h=this.elements,o=n.set(h[0],h[1],h[2]).length(),u=n.set(h[4],h[5],h[6]).length(),l=n.set(h[8],h[9],h[10]).length();this.determinant()<0&&(o=-o),t.x=h[12],t.y=h[13],t.z=h[14],a.copy(this);var c=1/o,d=1/u,m=1/l;return a.elements[0]*=c,a.elements[1]*=c,a.elements[2]*=c,a.elements[4]*=d,a.elements[5]*=d,a.elements[6]*=d,a.elements[8]*=m,a.elements[9]*=m,a.elements[10]*=m,e.setFromRotationMatrix(a),i.x=o,i.y=u,i.z=l,this}determinant(){var t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],n=t[1],a=t[5],h=t[9],o=t[13],u=t[2],l=t[6],c=t[10],d=t[14];return t[3]*(+s*h*l-r*o*l-s*a*c+i*o*c+r*a*d-i*h*d)+t[7]*(+e*h*d-e*o*c+s*n*c-r*n*d+r*o*u-s*h*u)+t[11]*(+e*o*l-e*a*d-s*n*l+i*n*d+s*a*u-i*o*u)+t[15]*(-r*a*u-e*h*l+e*a*c+r*n*l-i*n*c+i*h*u)}clone(){return(new s).fromArray(this.elements)}fromArray(t,e=0){for(var i=0;i<16;i++)this.elements[i]=t[i+e];return this}extractRotation(t){var e=new r,i=this.elements,s=t.elements,n=1/e.setFromMatrixColumn(t,0).length(),a=1/e.setFromMatrixColumn(t,1).length(),h=1/e.setFromMatrixColumn(t,2).length();return i[0]=s[0]*n,i[1]=s[1]*n,i[2]=s[2]*n,i[4]=s[4]*a,i[5]=s[5]*a,i[6]=s[6]*a,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,this}lookAt(t,e,i){var s=new r,n=new r,a=new r,h=this.elements;return a.subVectors(t,e),0===a.lengthSq()&&(a.z=1),a.normalize(),s.crossVectors(i,a),0===s.lengthSq()&&(1===Math.abs(i.z)?a.x+=1e-4:a.z+=1e-4,a.normalize(),s.crossVectors(i,a)),s.normalize(),n.crossVectors(a,s),h[0]=s.x,h[4]=n.x,h[8]=a.x,h[1]=s.y,h[5]=n.y,h[9]=a.y,h[2]=s.z,h[6]=n.z,h[10]=a.z,this}}function n(t=0,e=0,i=0,r=1){this._x=t,this._y=e,this._z=i,this._w=void 0!==r?r:1}var a,h,o;Object.assign(n,{slerp:function(t,e,i,r){return i.copy(t).slerp(e,r)},slerpFlat:function(t,e,i,r,s,n,a){var h=i[r+0],o=i[r+1],u=i[r+2],l=i[r+3],c=s[n+0],d=s[n+1],m=s[n+2],x=s[n+3];if(l!==x||h!==c||o!==d||u!==m){var f=1-a,_=h*c+o*d+u*m+l*x,g=_>=0?1:-1,p=1-_*_;if(p>Number.EPSILON){var E=Math.sqrt(p),T=Math.atan2(E,_*g);f=Math.sin(f*T)/E,a=Math.sin(a*T)/E}var v=a*g;if(h=h*f+c*v,o=o*f+d*v,u=u*f+m*v,l=l*f+x*v,f===1-a){var y=1/Math.sqrt(h*h+o*o+u*u+l*l);h*=y,o*=y,u*=y,l*=y}}t[e]=h,t[e+1]=o,t[e+2]=u,t[e+3]=l}}),Object.defineProperties(n.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(n.prototype,{set:function(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,e){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var i=t._x,r=t._y,s=t._z,n=t.order,a=Math.cos,h=Math.sin,o=a(i/2),u=a(r/2),l=a(s/2),c=h(i/2),d=h(r/2),m=h(s/2);return"XYZ"===n?(this._x=c*u*l+o*d*m,this._y=o*d*l-c*u*m,this._z=o*u*m+c*d*l,this._w=o*u*l-c*d*m):"YXZ"===n?(this._x=c*u*l+o*d*m,this._y=o*d*l-c*u*m,this._z=o*u*m-c*d*l,this._w=o*u*l+c*d*m):"ZXY"===n?(this._x=c*u*l-o*d*m,this._y=o*d*l+c*u*m,this._z=o*u*m+c*d*l,this._w=o*u*l-c*d*m):"ZYX"===n?(this._x=c*u*l-o*d*m,this._y=o*d*l+c*u*m,this._z=o*u*m-c*d*l,this._w=o*u*l+c*d*m):"YZX"===n?(this._x=c*u*l+o*d*m,this._y=o*d*l+c*u*m,this._z=o*u*m-c*d*l,this._w=o*u*l-c*d*m):"XZY"===n&&(this._x=c*u*l-o*d*m,this._y=o*d*l-c*u*m,this._z=o*u*m+c*d*l,this._w=o*u*l+c*d*m),!1!==e&&this.onChangeCallback(),this},setFromAxisAngle:function(t,e){var i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var e,i=t.elements,r=i[0],s=i[4],n=i[8],a=i[1],h=i[5],o=i[9],u=i[2],l=i[6],c=i[10],d=r+h+c;return d>0?(e=.5/Math.sqrt(d+1),this._w=.25/e,this._x=(l-o)*e,this._y=(n-u)*e,this._z=(a-s)*e):r>h&&r>c?(e=2*Math.sqrt(1+r-h-c),this._w=(l-o)/e,this._x=.25*e,this._y=(s+a)/e,this._z=(n+u)/e):h>c?(e=2*Math.sqrt(1+h-r-c),this._w=(n-u)/e,this._x=(s+a)/e,this._y=.25*e,this._z=(o+l)/e):(e=2*Math.sqrt(1+c-r-h),this._w=(a-s)/e,this._x=(n+u)/e,this._y=(o+l)/e,this._z=.25*e),this.onChangeCallback(),this},setFromUnitVectors:(h=new r,function(t,e){return void 0===h&&(h=new r),(a=t.dot(e)+1)<1e-6?(a=0,Math.abs(t.x)>Math.abs(t.z)?h.set(-t.y,t.x,0):h.set(0,-t.z,t.y)):h.crossVectors(t,e),this._x=h.x,this._y=h.y,this._z=h.z,this._w=a,this.normalize()}),inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,e){return void 0!==e?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,e){var i=t._x,r=t._y,s=t._z,n=t._w,a=e._x,h=e._y,o=e._z,u=e._w;return this._x=i*u+n*a+r*o-s*h,this._y=r*u+n*h+s*a-i*o,this._z=s*u+n*o+i*h-r*a,this._w=n*u-i*a-r*h-s*o,this.onChangeCallback(),this},slerp:function(t,e){if(0===e)return this;if(1===e)return this.copy(t);var i=this._x,r=this._y,s=this._z,n=this._w,a=n*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=n,this._x=i,this._y=r,this._z=s,this;var h=Math.sqrt(1-a*a);if(Math.abs(h)<.001)return this._w=.5*(n+this._w),this._x=.5*(i+this._x),this._y=.5*(r+this._y),this._z=.5*(s+this._z),this;var o=Math.atan2(h,a),u=Math.sin((1-e)*o)/h,l=Math.sin(e*o)/h;return this._w=n*u+this._w*l,this._x=i*u+this._x*l,this._y=r*u+this._y*l,this._z=s*u+this._z*l,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,e){return void 0===e&&(e=0),this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this.onChangeCallback(),this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}});class u{constructor(){this.changed=!1,this.matrix=new s,this.matrixWorld=new s,this.position=new Proxy(new r,{set:(t,e,i,r)=>{let s=Reflect.set(t,e,i,r);return this.updateMatrixWorld(!0),s}}),this.quaternion=new Proxy(new n,{set:(t,e,i,r)=>{let s=Reflect.set(t,e,i,r);return this.updateMatrixWorld(!0),s}}),this.scale=new Proxy(new r(1,1,1),{set:(t,e,i,r)=>{let s=Reflect.set(t,e,i,r);return this.updateMatrixWorld(!0),s}}),this.parent=null,this.children=[],this.matrixAutoUpdate=!0}applyMatrix(t){this.matrix.multiplyMatrices(t,this.matrix),this.matrix.decompose(this.position,this.quaternion,this.scale)}updateMatrix(){this.changed=!0,this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);for(var e=this.children,i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}rotateOnAxis(t,e){var i=new n;return i.setFromAxisAngle(t,e),this.quaternion.multiply(i),this}rotateOnWorldAxis(t,e){var i=new n;return i.setFromAxisAngle(t,e),this.quaternion.premultiply(i),this}rotateX(t){var e=new r(1,0,0);return this.rotateOnAxis(e,t)}rotateY(t){var e=new r(0,1,0);return this.rotateOnAxis(e,t)}rotateZ(t){var e=new r(0,0,1);return this.rotateOnAxis(e,t)}add(t){return t&&(t.parent=this,this.children.push(t)),this}traverse(t){t(this);for(var e=this.children,i=0,r=e.length;i<r;i++)e[i].traverse(t)}}(o=e.RenderSide||(e.RenderSide={}))[o.FRONT=0]="FRONT",o[o.BACK=1]="BACK",o[o.DOUBLE=2]="DOUBLE";class l{constructor(t,e,i){let r=t.createShader(e);return t.shaderSource(r,i),t.compileShader(r),!1===t.getShaderParameter(r,t.COMPILE_STATUS)&&console.error("Shader couldn't compile."),""!==t.getShaderInfoLog(r)&&(console.warn("gl.getShaderInfoLog()",e===t.VERTEX_SHADER?"vertex":"fragment",t.getShaderInfoLog(r)),t.deleteShader(r)),r}}class c{constructor(t){this.gl=t,this.emptyTextures=[],this.emptyTextures[t.TEXTURE_2D]=this.createTexture(t.TEXTURE_2D,t.TEXTURE_2D,1),this.emptyTextures[t.TEXTURE_CUBE_MAP]=this.createTexture(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6)}getEmptyTexture(t){return this.emptyTextures[t]}createTexture(t,e,i){let r=this.gl;var s=new Uint8Array(4),n=r.createTexture();r.bindTexture(t,n),r.texParameteri(t,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(t,r.TEXTURE_MAG_FILTER,r.NEAREST);for(var a=0;a<i;a++)r.texImage2D(e+a,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,s);return n}static getInstance(t){return c.webGL||(c.webGL=new c(t)),c.webGL}}class d{constructor(t){this.unit=0,this.gl=t,this.textureCache=new WeakMap}createTexture(t,e,i){let r=this.gl;t.glTexture=r.createTexture(),r.bindTexture(r.TEXTURE_2D,t.glTexture),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e,i,0,r.RGBA,r.UNSIGNED_BYTE,null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.bindTexture(r.TEXTURE_2D,null)}setTexture2D(t,e){let i=this.gl,r=this.textureCache.get(t),s=this.unit;r||(r={version:0},this.textureCache.set(t,r),this.unit++),t.image&&t.version>0&&r.version!=t.version&&(t.glTexture=t.glTexture?t.glTexture:i.createTexture(),i.activeTexture(i.TEXTURE0+s),i.bindTexture(i.TEXTURE_2D,t.glTexture),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0),r.version=t.version,i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,t.image),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1)),i.activeTexture(i.TEXTURE0+s),i.bindTexture(i.TEXTURE_2D,t.glTexture||c.getInstance(i).getEmptyTexture(i.TEXTURE_2D))}setTextureCube(t,e){let i=this.gl,r=this.textureCache.get(t),s=this.unit;if(r||(r={version:0},this.textureCache.set(t,r),this.unit++),t.images.length&&t.version>0&&r.version!=t.version){t.glTexture=t.glTexture?t.glTexture:i.createTexture(),i.activeTexture(i.TEXTURE0+this.unit),i.bindTexture(i.TEXTURE_CUBE_MAP,t.glTexture);for(let e=0;e<6;e++){let s=t.images[e];i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,s),r.version=t.version}i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}i.activeTexture(i.TEXTURE0+s),i.bindTexture(i.TEXTURE_CUBE_MAP,t.glTexture||c.getInstance(i).getEmptyTexture(i.TEXTURE_CUBE_MAP))}}class m{constructor(t,e=1,i=1){if(this.state=new Proxy({needsUpdate:!1,version:0},{set:(t,e,i,r)=>{let s=Reflect.set(t,e,i,r);return"needsUpdate"===e&&!0===i&&this.version++,s}}),this.version=0,this.imageLoadedCount=0,this.image=null,this.images=[],t instanceof Array)this.imageCount=t.length,t.forEach(t=>{let e=new Image;e.onload=()=>{this.loadedCallback(),e.onload=null},e.src=t,this.images.push(e)});else if(t){let e=new Image;e.onload=()=>{this.loadedCallback(),e.onload=null},e.src=t,this.image=e,this.imageCount=1}this.format=e,this.type=i,this.needsUpdate=!1,this.glTexture=null}loadedCallback(){this.imageLoadedCount+=1,this.imageLoadedCount==this.imageCount&&(this.state.needsUpdate=!0)}clone(){return new m(void 0).copy(this)}copy(t){return this.image=t.image,this.format=t.format,this.type=t.type,this}}let x=new m;function f(t,e){t.uniform1f(this.addr,e)}function _(t,e){t.uniform1i(this.addr,e)}function g(t,e){void 0===e.x?t.uniform2fv(this.addr,e):t.uniform2f(this.addr,e.x,e.y)}function p(t,e){void 0!==e.x?t.uniform3f(this.addr,e.x,e.y,e.z):void 0!==e.r?t.uniform3f(this.addr,e.r,e.g,e.b):t.uniform3fv(this.addr,e)}function E(t,e){void 0===e.x?t.uniform4fv(this.addr,e):t.uniform4f(this.addr,e.x,e.y,e.z,e.w)}function T(t,e){t.uniformMatrix2fv(this.addr,!1,e.elements||e)}function v(t,e){t.uniformMatrix3fv(this.addr,!1,e.elements||e)}function y(t,e){t.uniformMatrix4fv(this.addr,!1,e.elements||e)}function w(t,e,i){t.uniform1i(this.addr,i.unit),i.setTexture2D(e||x)}function R(t,e,i){t.uniform1i(this.addr,i.unit),i.setTextureCube(e)}function b(t,e){t.uniform2iv(this.addr,e)}function A(t,e){t.uniform3iv(this.addr,e)}function M(t,e){t.uniform4iv(this.addr,e)}function z(t,e,i){this.id=t,this.addr=i,this.setValue=function(t){switch(t){case 5126:return f;case 35664:return g;case 35665:return p;case 35666:return E;case 35674:return T;case 35675:return v;case 35676:return y;case 35678:return w;case 35680:return R;case 5124:case 35670:return _;case 35667:case 35671:return b;case 35668:case 35672:return A;case 35669:case 35673:return M}}(e.type)}var U,C=[];function S(t,e,i){var r=t[0];if(r<=0||r>0)return t;var s=e*i,n=C[s];if(void 0===n&&(n=new Float32Array(s),C[s]=n),0!==e){r.toArray(n,0);for(var a=1,h=0;a!==e;++a)h+=i,t[a].toArray(n,h)}return n}function P(t,e){t.uniform1fv(this.addr,e)}function B(t,e){t.uniform1iv(this.addr,e)}function L(t,e){t.uniform2fv(this.addr,S(e,this.size,2))}function F(t,e){t.uniform3fv(this.addr,S(e,this.size,3))}function I(t,e){t.uniform4fv(this.addr,S(e,this.size,4))}function N(t,e){t.uniformMatrix2fv(this.addr,!1,S(e,this.size,4))}function O(t,e){t.uniformMatrix3fv(this.addr,!1,S(e,this.size,9))}function X(t,e){t.uniformMatrix4fv(this.addr,!1,S(e,this.size,16))}function D(t,e,i){this.id=t,this.addr=i,this.size=e.size,this.setValue=function(t){switch(t){case 5126:return P;case 35664:return L;case 35665:return F;case 35666:return I;case 35674:return N;case 35675:return O;case 35676:return X;case 5124:case 35670:return B;case 35667:case 35671:return b;case 35668:case 35672:return A;case 35669:case 35673:return M}}(e.type)}class G{constructor(t,e){this.textureManager=new d(t),this.gl=t,this.map={},this.seq=[];for(var i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS),r=0;r!==i;++r){var s=t.getActiveUniform(e,r),n=s.name,a=t.getUniformLocation(e,n);this.parseUniform(s,a,this)}}addUniform(t,e){t.seq.push(e),t.map[e.id]=e}parseUniform(t,e,i){var r=/([\w\d_]+)(\])?(\[|\.)?/g,s=t.name,n=s.length;for(r.lastIndex=0;;){var a=r.exec(s),h=r.lastIndex,o=a[1],u="]"===a[2],l=a[3];if(u&&(o+=0),void 0===l||"["===l&&h+2===n){this.addUniform(i,void 0===l?new z(o,t,e):new D(o,t,e));break}i=i.map[o]}}updateUniforms(t={}){this.textureManager.unit=0;let e=this.filterUniforms(Object.keys(t));for(var i=0,r=e.length;i!==r;++i){var s=e[i],n=t[s.id];!1!==n.needsUpdate&&s.setValue(this.gl,n.value,this.textureManager)}}filterUniforms(t){for(var e=[],i=0,r=this.seq.length;i!==r;++i){var s=this.seq[i];-1!=t.indexOf(s.id)&&e.push(s)}return e}}class W{constructor(t,e){this.program=t.createProgram();let i=new l(t,t.VERTEX_SHADER,e.vertexShader),r=new l(t,t.FRAGMENT_SHADER,e.fragmentShader);t.attachShader(this.program,i),t.attachShader(this.program,r),t.linkProgram(this.program);let s=t.getProgramInfoLog(this.program).trim();!1===t.getProgramParameter(this.program,t.LINK_STATUS)?console.error("shader error: ",t.getError(),"gl.VALIDATE_STATUS",t.getProgramParameter(this.program,t.VALIDATE_STATUS),"gl.getProgramInfoLog",s):""!==s&&console.warn("gl.getProgramInfoLog()",s),t.useProgram(this.program),t.deleteShader(i),t.deleteShader(r),this.uniformManager=new G(t,this.program)}}class k{constructor(){this.programCache=new Map}getProgram(t,e){let i=this.getProgramCacheKey(e),r=this.programCache.get(i);return r||(r=new W(t,e),this.programCache.set(i,r)),r}getProgramCacheKey(t){let e=[];return e.push(t.fragmentShader),e.push(t.vertexShader),e.join()}}class V{constructor(t,e){this.min=void 0!==t?t:new r(1/0,1/0,1/0),this.max=void 0!==e?e:new r(-1/0,-1/0,-1/0)}}class q{constructor(){this.attributes=new Map,this.index=null,this.boundingBox=new V}addAttribute(t,e){"index"===t?this.index=e:this.attributes.set(t,e)}}class j{constructor(t,e=!1){this.itemSize=t,this.normalized=e}setXY(t,e,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}}class Y extends j{constructor(t,e,i=!1){super(e,i),t instanceof Float32Array?this.array=t:this.array=new Float32Array(t)}}class H extends j{constructor(t,e,i=!1){super(e,i),t instanceof Uint32Array?this.array=t:this.array=new Uint32Array(t)}}class K{constructor(t={},e=!0){this.positions=t.positions||[],this.cells=t.cells||[],this.sameIndex=e,this.vertexUVs=t.vertexUVs,this.faceUVs=t.faceUVs,this.vertexNormals=t.vertexNormals,this.faceNormals=t.faceNormals,this.normalIndices=t.normalIndices}toBufferGeometry(){let t=new q,e=[],i=[],r=[];if(this.sameIndex)t.addAttribute("index",new H(this.cells.flat(),1)),e=this.positions.flat(),this.vertexNormals&&(i=this.vertexNormals.flat()),this.vertexUVs&&(r=this.vertexUVs.flat());else for(let t=0;t<this.cells.length;t++){if(this.cells[t].forEach(t=>{this.positions[t].forEach(t=>{e.push(t)})}),this.normalIndices){let e=this.normalIndices[t];console.log(e),e.forEach(t=>{this.vertexNormals[t].forEach(t=>{i.push(t)})})}this.faceUVs.length&&this.faceUVs[t].forEach(t=>{this.vertexUVs[t].forEach(t=>{r.push(t)})})}return t.addAttribute("position",new Y(e,3)),t.addAttribute("normal",new Y(i,3)),t.addAttribute("uv",new Y(r,2)),t}}class Z extends u{constructor(t,i){super(),this.vertexShader="\n        attribute vec4 position;\n        void main () {\n          gl_Position = position;\n        }\n      ",t.fragmentShader&&(this.fragmentShader=t.fragmentShader),t.vertexShader&&(this.vertexShader=t.vertexShader),t.uniforms&&(this.uniforms=t.uniforms),this.transparent=t.transparent||!1,this.side=t.side||e.RenderSide.FRONT,i instanceof K?(this.geometry=i,this.bufferGeometry=this.geometry.toBufferGeometry()):this.bufferGeometry=i,this.programManager=new k}getVertexNum(){return this.vertexNum}getProgram(){return this.glProgram}update(t,e){let i=e||{vertexShader:this.vertexShader,fragmentShader:this.fragmentShader};this.program=this.programManager.getProgram(t,i),this.glProgram=this.program.program,t.useProgram(this.glProgram),this.updateBuffer(t),this.updateUniforms(t)}updateBuffer(t){if(this.bufferManager)this.bufferManager.bindBuffer(t,this.glProgram,this.bufferGeometry);else{this.bufferManager=new i;let e=this.bufferManager.initBuffer(t,this.glProgram,this.bufferGeometry);this.vertexNum=e.count,this.hasIndex=e.hasIndex}}updateUniforms(t){this.program.uniformManager.updateUniforms(this.uniforms)}}class Q extends q{constructor(t=1,e=1,i=1,r=1){super();var s,n,a=t/2,h=e/2,o=Math.floor(i)||1,u=Math.floor(r)||1,l=o+1,c=u+1,d=t/o,m=e/u,x=[],f=[],_=[],g=[];for(n=0;n<c;n++){var p=n*m-h;for(s=0;s<l;s++){var E=s*d-a;f.push(E,-p,0),_.push(0,0,1),g.push(s/o),g.push(1-n/u)}}for(n=0;n<u;n++)for(s=0;s<o;s++){var T=s+l*n,v=s+l*(n+1),y=s+1+l*(n+1),w=s+1+l*n;x.push(T,v,w),x.push(v,y,w)}this.addAttribute("position",new Y(f,3)),this.addAttribute("normal",new Y(_,3)),this.addAttribute("uv",new Y(g,2)),this.addAttribute("index",new H(x,1))}}class J extends Z{constructor(t={},e){super(t=Object.assign({fragmentShader:"void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",uniforms:{}},t),e||new Q(2,2))}}class ${constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=("undefined"==typeof performance?Date:performance).now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){var t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){var e=("undefined"==typeof performance?Date:performance).now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class tt{constructor(t){this.extensions={},this.gl=t,this.get("WEBGL_depth_texture"),this.get("OES_texture_float"),this.get("OES_texture_float_linear"),this.get("OES_texture_half_float"),this.get("OES_texture_half_float_linear"),this.get("OES_standard_derivatives"),this.get("OES_element_index_uint"),this.get("ANGLE_instanced_arrays")}get(t){let e=this.gl;if(void 0!==this.extensions[t])return this.extensions[t];var i;switch(t){case"WEBGL_depth_texture":i=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;case"WEBGL_compressed_texture_etc1":i=e.getExtension("WEBGL_compressed_texture_etc1");break;default:i=e.getExtension(t)}return null===i&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),this.extensions[t]=i,i}}class et extends u{constructor(){super(),this.up=new r(0,1,0),this.projectionMatrix=new s,this.matrixWorldInverse=new s,this.target=new r}lookTarget(t){t=t||this.target;var e=new s;e.lookAt(this.position,t,this.up),this.quaternion.setFromRotationMatrix(e)}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.getInverse(this.matrixWorld)}}class it extends et{constructor(t,e,i,r){super(),this.fov=void 0!==t?t:50,this.zoom=1,this.near=void 0!==i?i:.1,this.far=void 0!==r?r:2e3,this.focus=10,this.aspect=void 0!==e?e:1,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}updateProjectionMatrix(){var t=this.near,e=t*Math.tan(Math.PI/180*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r,n=this.filmOffset;0!==n&&(s+=t*n/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far)}}class rt extends q{constructor(){super(),this.addAttribute("position",new Y([1,-1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,-1,1,1,-1,1,-1,1,1,-1],3)),this.addAttribute("index",new H([0,3,2,0,2,1,4,0,5,0,1,5,5,1,2,5,2,6,6,2,3,6,3,7,7,3,0,7,0,4,4,5,6,4,6,7],1))}}class st extends J{constructor(t={},e){super(t=Object.assign({vertexShader:"\n        uniform mat4 mvpMatrix;\n        attribute vec4 position;\n        varying vec4 vTexCoords;\n        void main () {\n          vTexCoords = position;\n          gl_Position = mvpMatrix*position;\n        }\n      ",fragmentShader:"\n        #ifdef GL_ES\n        precision mediump float;\n        #endif\n        uniform samplerCube cube;\n        varying vec4 vTexCoords;\n        void main() {\n          gl_FragColor = textureCube(cube, vTexCoords.xyz);\n        }\n      "},t),e||new rt)}}class nt{constructor(t=0,e=0){this.x=t,this.y=e}set(t,e){return this.x=t,this.y=e,this}add(t){return this.x+=t.x,this.y+=t.y,this}sub(t){return this.x-=t.x,this.y-=t.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}clone(){return new nt(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}equals(t){return t.x===this.x&&t.y===this.y}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}}!function(t){t[t.PERSPECTIVE=0]="PERSPECTIVE",t[t.ORTHOGRAPHIC=1]="ORTHOGRAPHIC"}(U||(U={}));class at{constructor(t,e,i,r={}){this.gl=t,this.textureManager=new d(t),this.width=e,this.height=i,this.texture=new m,this.textureManager.createTexture(this.texture,e,i),this.frameBuffer=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,this.frameBuffer),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.texture.glTexture,null),t.bindFramebuffer(t.FRAMEBUFFER,null)}setupDepthTexture(t,e){}clone(){return new at(this.gl,this.width,this.height).copy(this)}copy(t){return this.width=t.width,this.height=t.height,this.texture=t.texture.clone(),this}}e.BufferGeometry=q,e.Clock=$,e.Float32Attribute=Y,e.Geometry=K,e.Object3D=u,e.OrthographicCamera=class extends et{constructor(t,e,i,r,s,n){super(),this.zoom=1,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=void 0!==s?s:.1,this.far=void 0!==n?n:2e3,this.updateProjectionMatrix()}updateProjectionMatrix(){var t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-t,n=i+t,a=r+e,h=r-e;this.projectionMatrix.makeOrthographic(s,n,a,h,this.near,this.far)}},e.PerspectiveCamera=it,e.Quaternion=n,e.RenderFlow=class{constructor(t,e){this.renderer=t;let i={};if(void 0===e){let r=t.getSize();this.pixelRatio=t.getPixelRatio(),this.width=r.x,this.height=r.y,e=new at(t.gl,this.width*this.pixelRatio,this.height*this.pixelRatio,i)}else this.pixelRatio=1,this.width=e.width,this.height=e.height;this.renderTarget1=e,this.renderTarget2=new at(t.gl,this.width*this.pixelRatio,this.height*this.pixelRatio,i),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.clock=new $}swapBuffers(){var t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this.width*this.pixelRatio,this.height*this.pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t)}isLastEnabledPass(t){for(var e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){void 0===t&&(t=this.clock.getDelta());var e,i,r=this.renderer.getRenderTarget(),s=this.passes.length;for(i=0;i<s;i++)!1!==(e=this.passes[i]).enabled&&(e.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),e.render(this.renderer,this.writeBuffer,this.readBuffer,t,!1),e.needsSwap&&this.swapBuffers());this.renderer.setRenderTarget(r)}},e.RenderableElement=Z,e.Renderer=class{constructor(t,e={}){if(this.opaqueList=[],this.transparentList=[],this.renderTarget=null,t.element instanceof HTMLCanvasElement)this.canvas=t.element;else{let e;this.canvas=document.createElement("canvas"),t.element instanceof HTMLElement?e=t.element:(e=document.getElementById(t.element),e||console.error(t.element+" not found!")),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.width=e.clientWidth,this.height=e.clientHeight,this.setPixelRatio(window.devicePixelRatio);let i=this.canvas.width/this.canvas.height;this.defaultCamera=new it(50,i,.1,1e3),this.defaultCamera.position.z=10,this.cameraMode=t.cameraMode||U.PERSPECTIVE,e.insertBefore(this.canvas,e.firstChild)}this.contextAttributes=Object.assign({alpha:!0,depth:!0,stencil:!0,antialias:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!0},e),this.gl=t.gl||this.canvas.getContext("webgl",this.contextAttributes)||this.canvas.getContext("experimental-webgl",this.contextAttributes),this.contextAttributes.depth&&this.gl.enable(this.gl.DEPTH_TEST),this.programs=new Map,this.extensions=new tt(this.gl),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}setupMouse(){let t=this.gl,e={x:0,y:0},i={x:0,y:0},r={x:0,y:0},s=(e,i)=>{this.opaqueList.forEach(r=>{t.useProgram(r.glProgram);var s=t.getUniformLocation(r.glProgram,"mouse");null!=s&&t.uniform2f(s,e,i)})};s(0,1),this.canvas.addEventListener("mousemove",t=>{r.x=t.clientX-e.x+i.x,r.y=t.clientY-e.y+i.y,s(r.x/this.canvas.width,1-r.y/this.canvas.height)},!1),this.canvas.addEventListener("mouseover",t=>{e.x=t.clientX,e.y=t.clientY},!1),this.canvas.addEventListener("mouseout",t=>{i.x=r.x,i.y=r.y},!1)}setRenderTarget(t){t?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,t.frameBuffer),this.renderTarget=t):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.renderTarget=null)}renderElement(t,i,r){let n,a=this.gl,h=new s;if(t instanceof J?a.disable(a.DEPTH_TEST):(a.enable(a.DEPTH_TEST),h.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse)),t.update(a,r),t instanceof st){let e=new s;e.extractRotation(i.matrixWorld),e.getInverse(e),n=new s,n.multiplyMatrices(i.projectionMatrix,e),n.multiply(t.matrixWorld)}else n=h.clone(),n.multiply(t.matrixWorld);var o=a.getUniformLocation(t.glProgram,"mvpMatrix");switch(null!=o&&a.uniformMatrix4fv(o,!1,n.elements),t.side){case e.RenderSide.FRONT:a.enable(a.CULL_FACE),a.cullFace(a.BACK);break;case e.RenderSide.BACK:a.enable(a.CULL_FACE),a.cullFace(a.FRONT);break;case e.RenderSide.DOUBLE:a.disable(a.CULL_FACE)}t.hasIndex?a.drawElements(a.TRIANGLES,t.vertexNum,a.UNSIGNED_INT,0):a.drawArrays(a.TRIANGLES,0,t.vertexNum)}getRenderTarget(){return this.renderTarget}setPixelRatio(t){void 0!==t&&(this.pixelRatio=t,this.setSize(this.width,this.height,!1))}getPixelRatio(){return this.pixelRatio}setSize(t,e,i){this.width=t,this.height=e,this.canvas.width=Math.floor(t*this.pixelRatio),this.canvas.height=Math.floor(e*this.pixelRatio),this.canvas.style.width=t+"px",this.canvas.style.height=e+"px"}getSize(){return new nt(this.width,this.height)}render(t,e,i,r=!1){let s=this.gl;s.clearColor(0,0,0,0);let n=()=>{this.opaqueList=[],this.transparentList=[],t&&this.opaqueList.push(t),e&&e.traverse(t=>{t instanceof Z&&(t.transparent?this.transparentList.push(t):this.opaqueList.push(t))}),i=i||this.defaultCamera,s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT),this.opaqueList.forEach(t=>{this.renderElement(t,i)}),this.transparentList.forEach(t=>{this.renderElement(t,i)}),r||requestAnimationFrame(n)};n()}},e.SkyBox=st,e.Texture=m,e.Uint32Attribute=H,e.Vector2=nt,e.Vector3=r}(t={exports:{}},t.exports),t.exports);(e=i)&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")&&e.default;i.RenderSide;var r=i.BufferGeometry,s=(i.Clock,i.Float32Attribute),n=(i.Geometry,i.Object3D,i.OrthographicCamera,i.PerspectiveCamera,i.Quaternion,i.RenderFlow,i.RenderableElement,i.Renderer,i.SkyBox,i.Texture,i.Uint32Attribute);i.Vector2,i.Vector3;function a(t,e){return t>0?t-1:t+e}var h=function(t){"string"!=typeof buf&&(t=t.toString());for(var e=t.trim().split("\n"),i=[],r=[],s=[],n=[],h=[],o=[],u=null,l=0;l<e.length;l++){var c=e[l];if("#"!==c[0]){var d=c.trim().replace(/ +/g," ").split(" ");switch(d[0]){case"o":u=d.slice(1).join(" ");break;case"v":var m=d.slice(1).map(Number).slice(0,3);i.push(m);break;case"vt":var x=d.slice(1).map(Number);s.push(x);break;case"vn":var f=d.slice(1).map(Number);n.push(f);break;case"f":var _=[],g=[],p=[];d.slice(1).forEach((function(t){var e=t.split("/").map((function(t){return""===t?NaN:Number(t)}));_.push(a(e[0],i.length)),e.length>1&&(isNaN(e[1])||g.push(a(e[1],s.length)),isNaN(e[2])||p.push(a(e[2],n.length)))})),r.push(_),g.length>0&&h.push(g),p.length>0&&o.push(p)}}}var E={positions:i,cells:r};return s.length>0&&(E.vertexUVs=s),h.length>0&&(E.faceUVs=h),n.length>0&&(E.vertexNormals=n),o.length>0&&(E.faceNormals=o),null!==u&&(E.name=u),E};function o(t){let e=h(t),i=new r,a=[],o=[],u=[];for(let t=0;t<e.cells.length;t++){let i=e.cells[t],r=e.faceNormals[t];for(let t=0;t<3;t++)for(let s=0;s<3;s++)o.push(e.positions[i[t]][s]),a.push(e.vertexNormals[r[t]][s]);u.push(3*t,3*t+1,3*t+2)}return i.addAttribute("position",new s(o,3)),i.addAttribute("index",new n(u,1)),i.addAttribute("normal",new s(a,3)),i}export{o as parse};
//# sourceMappingURL=index.es.js.map

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@gl-widget/gl-widget");class e extends t.BufferGeometry{constructor(t){super(),this.indices=[],this.uvs=[],this.positions=[],this.normals=[],this.generateGeometry(t)}generateGeometry(e){let{radius:r=1,widthSegments:a=16,heightSegments:i=16,phiStart:s=0,phiLength:o=2*Math.PI,thetaStart:h=0,thetaLength:n=Math.PI}=e;a=Math.max(3,Math.floor(a)),i=Math.max(2,Math.floor(i)),s=void 0!==s?s:0,o=void 0!==o?o:2*Math.PI,h=void 0!==h?h:0,n=void 0!==n?n:Math.PI;for(var u=h+n,d=(a+1)*(i+1),l=new t.Float32Attribute(new Float32Array(3*d),3),M=new t.Float32Attribute(new Float32Array(3*d),3),p=new t.Float32Attribute(new Float32Array(2*d),2),v=0,g=[],m=new t.Vector3,w=0;w<=i;w++){for(var A=[],b=w/i,c=0;c<=a;c++){var f=c/a,y=-r*Math.cos(s+f*o)*Math.sin(h+b*n),x=r*Math.cos(h+b*n),F=r*Math.sin(s+f*o)*Math.sin(h+b*n);m.set(y,x,F).normalize(),l.setXYZ(v,y,x,F),M.setXYZ(v,m.x,m.y,m.z),p.setXY(v,f,1-b),A.push(v),v++}g.push(A)}var P=[];for(w=0;w<i;w++)for(c=0;c<a;c++){var I=g[w][c+1],S=g[w][c],G=g[w+1][c],X=g[w+1][c+1];(0!==w||h>0)&&P.push(I,S,X),(w!==i-1||u<Math.PI)&&P.push(S,G,X)}this.addAttribute("position",l),this.addAttribute("normal",M),this.addAttribute("uv",p),this.addAttribute("index",new t.Uint32Attribute(P,1))}}exports.SphereGeometry=e;
//# sourceMappingURL=index.cjs.js.map
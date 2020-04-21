// import { parse } from 'extract-svg-path'
import svgMesh3d from 'svg-mesh-3d'
import { Geometry } from '@gl-widget/gl-widget'

function traverseNodes(child, paths, attributes = {}) {
  for (let i in child.childNodes) {
    let c = child.childNodes[i];
    if (c.tagName) {
      if (c.getAttribute('display') == 'none') continue;
      switch (c.tagName) {
        case 'path':
          paths.push(c.getAttribute('d'))
          break;
      }
      traverseNodes(c, paths, attributes);
    }
  }
}

class SvgGeometry extends Geometry {
  constructor(svg, options) {
    let paths = []
    traverseNodes(svg, paths)
    var mesh = svgMesh3d(paths.join(), {
    })
    super(mesh)
  }
}
  
export { SvgGeometry };
  
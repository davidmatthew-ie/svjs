/**
 * A class to instantiate a new SvJs element.
 */
export default class SvJs {

  /**
   * Class fields.
   */
  cursorX = null;
  cursorY = null;
  elementName;
  namespace = 'http://www.w3.org/2000/svg';

  /**
   * Create an SVG element.
   * 
   * @param {string} element - The name of the SVG element to create. 
   * @param {string} namespace - The namespace url to reference.
   */
  constructor(element = 'svg', namespace = this.namespace) {
    this.element = document.createElementNS(namespace, element);

    this.#isValid(element);

    this.elementName = element;

    if (this.elementName === 'svg') {
      this.element.setAttribute('xmlns', namespace);
    }
  }

  /**
   * Add the SVG element to the specified node.
   * 
   * @chainable
   * @param {node} node - A HTML or SVG parent node.
   * @returns {object} itself.
   */
  addTo(node) {
    node.appendChild(this.element);

    return this;
  }

  /**
   * Create and append an SVG child element.
   *
   * @chainable
   * @param {string} element - The name of the SVG element to create.
   * @returns {object} The created SVG child element.
   */
  create(element) {
    this.child = new SvJs(element);
    this.element.appendChild(this.child.element);

    return this.child;
  }

  /**
   * Creates a smooth bezier curve from an array of points.
   * 
   * @chainable
   * @param {array} points - An two-dimensional array of [[x,y], [x,y]...] points.
   * @param {number} curveFactor - 0 means no curve. Default is 1.66 (approximates a circle given a square).
   * @param {boolean} isClosed - Is the curve open or closed. Default is false (so curve is open).
   * @param {string} stroke - The stroke colour. Black by default.
   * @param {string} fill - The fill colour. None by default.
   */
  createBezier(points, curveFactor = 1.66, isClosed = false, stroke = '#000', fill = 'none') {
    let path = new SvJs('path');

    if (isClosed) {
      let first = points[0];
      let second = points[1];
      let secondLast = points[points.length - 2];
      let last = points[points.length - 1];
  
      points.push(first, second);
      points.unshift(secondLast, last);
    }
  
    points = points.flat();
  
    let moveX = isClosed ? points[2] : points[0];
    let moveY = isClosed ? points[3] : points[1];
  
    let pathData = `M ${[moveX, moveY]}`;
  
    let iStart = isClosed ? 2 : 0;
    let iEnd = isClosed ? points.length - 4 : points.length - 2;
  
    for (let i = iStart; i < iEnd; i += 2) {
      let x0 = i ? points[i - 2] : points[0];
      let y0 = i ? points[i - 1] : points[1];
  
      let x1 = points[i];
      let y1 = points[i + 1];
  
      let x2 = points[i + 2];
      let y2 = points[i + 3];
  
      let x3 = i !== points.length - 4 ? points[i + 4] : x2;
      let y3 = i !== points.length - 4 ? points[i + 5] : y2;
  
      let cp1x = x1 + ((x2 - x0) / 6) * curveFactor;
      let cp1y = y1 + ((y2 - y0) / 6) * curveFactor;
  
      let cp2x = x2 - ((x3 - x1) / 6) * curveFactor;
      let cp2y = y2 - ((y3 - y1) / 6) * curveFactor;
  
      pathData += `C ${[cp1x, cp1y, cp2x, cp2y, x2, y2]}`;
    }

    path.set({
      d: pathData,
      stroke: stroke,
      fill: fill
    });

    this.element.appendChild(path.element);

    return path;
  }

  /**
   * Create a gradient and append it to the defs element.
   * 
   * @chainable
   * @param {string} id - The id. Reference this when applying the gradient.
   * @param {string} type - Accepts linear or radial.
   * @param {number} rotation - The angle of rotation. 
   * @param {string} units - Accepts userSpaceOnUse or objectBoundingBox.
   * @returns {object} The created gradient element.
   */
  createGradient(id, type = 'linear', rotation = 45, units = 'objectBoundingBox') {
    this.#isMainSVG();
    
    const gradient = new SvJs(`${type}Gradient`);
    gradient.set({
      id: id,
      gradientUnits : `${units}`,
      gradientTransform: `rotate(${rotation})`
    });

    const defs = this.#defsCheck();
    defs.appendChild(gradient.element);

    return gradient;
  }

  /**
   * Create a pattern and append it to the defs element.
   * 
   * @chainable
   * @param {string} id - The id. Reference this when applying the gradient.
   * @returns {object} The created pattern element.
   */
  createPattern(id) {
    this.#isMainSVG();
    
    const pattern = new SvJs('pattern');
    pattern.set({ id: id });

    const defs = this.#defsCheck();
    defs.appendChild(pattern.element);

    return pattern;
  }

  /**
   * Delete the SVG element.
   */
  delete() {
    this.element.remove();
  }

  /**
   * Get a given attribute's value.
   * 
   * @param {*} attribute - The attribute.
   * @returns {*} the attribute value.
   */
  get(attribute) {
    return this.element.getAttributeNS(null, attribute);
  }

  /**
   * Set the attribute values of an SVG element. Replaces _ with - for relevant attributes.
   * 
   * @chainable
   * @param {object} attributes - An object of attribute value pairs.
   * @returns {object} itself.
   */
  set(attributes) {
    for (let key in attributes) {
      let prop = key.replace(/_/g, '-');
      
      this.element.setAttributeNS(null, prop, attributes[key]);
    }

    return this;
  }

  /**
   * Update the cursorX and cursorY properties on the main SVG element.
   * Accurate cursor tracking via matrix transformation. Compatible with touch devices.
   * 
   * @chainable
   * @returns {object} itself.
   */
  trackCursor() {
    this.#isMainSVG();

    let point = this.element.createSVGPoint();

    this.element.addEventListener('pointermove', (event) => {
      this.element.style.touchAction = 'none';
      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(this.element.getScreenCTM().inverse());
      this.cursorX = Math.ceil(point.x);
      this.cursorY = Math.ceil(point.y);
    });

    this.element.addEventListener('pointerleave', () => {
      this.element.style.touchAction = 'auto';
    });

    return this;
  }

  /**
   * Check if the def element already exists, and create it if it doesn't.
   * 
   * @returns {object} The defs element.
   */
  #defsCheck(element) {
    return document.querySelector('defs') ?
      document.querySelector('defs')
      : this.create('defs').element;
  }

  /**
   * Check if the element is the main SVG element.
   * 
   * @throws {error} if the element is not the main SVG.
   */
  #isMainSVG() {
    if (this.elementName !== 'svg') {
      throw new Error('This function can only be called on the main SVG element.');
    }
  }

  /**
   * Check if the created SVG element is valid.
   * 
   * @param {string} element - The SVG element name to validate.
   */
  #isValid(element) {
    const elementToString = Object.prototype.toString.call(this.element).toLowerCase();

    if (elementToString !== `[object svg${element.toLowerCase()}element]`) {
      throw new Error(`Invalid SVG element: ${elementToString}`); 
    }
  }
}

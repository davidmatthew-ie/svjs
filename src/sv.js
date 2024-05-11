/**
 * A class to instantiate a new SvJs element.
 */
class SvJs {

  /**
   * Create an SVG element.
   * 
   * @param {string} [element] - The name of the SVG element to create. 
   * @param {string} [namespace] - The namespace url to reference.
   */
  constructor(element = 'svg', namespace = 'http://www.w3.org/2000/svg') {
    this.element = document.createElementNS(namespace, element);
    this.cursorX = null;
    this.cursorY = null;

    this.#isValid();

    if (this.element.nodeName === 'svg') {
      this.element.setAttribute('xmlns', namespace);
    }
  }

  /**
   * An alias of the DOM addEventListener method.
   * 
   * @chainable
   * @param {Event} type - The event type.
   * @param {function} callback - The callback function.
   * @returns {object} itself.
   */
  addEventListener(type, callback) {
    this.element.addEventListener(type, callback);
    
    return this;
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
   * Animate an element using the Web Animations API.
   * 
   * @chainable
   * @param {(array|object)} keyframes - An array of keyframe objects, or an object of keyframe arrays.
   * @param {object} options - A single duration, or an object containing timing properties. 
   * @returns {object} itself.
   */
  animate(keyframes, options) {
    this.element.animate(keyframes, options);
    
    return this;
  }

  /**
   * Inserts content within an element. Useful for textual elements.
   * 
   * @chainable
   * @param {string} text - The content to insert.
   * @returns {object} itself.
   */
  content(text) {
    this.element.innerHTML = text;

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

    if (element === 'defs') {
      this.child.element = this.#defsCheck();
    } else {
      this.element.appendChild(this.child.element);
    }

    return this.child;
  }

  /**
   * Creates a smooth, open bezier curve from an array of points.
   * 
   * @chainable
   * @param {array} points - A two-dimensional array of [[x,y], [x,y]...] points.
   * @param {number} [curveFactor = 1] - 0 means that points connected by straight lines. Default is 1.
   * @returns {object} The created path.
   */
  createCurve(points, curveFactor = 1) {
    let path = new SvJs('path');
  
    points = points.flat();
  
    let pathData = `M ${[points[0], points[1]]}`;
  
    for (let i = 0; i < points.length - 2; i += 2) {
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
      stroke: '#888',
      fill: 'none'
    });

    this.element.appendChild(path.element);

    return path;
  }

  /**
   * Creates a filter and appends it to the defs element.
   * 
   * @chainable
   * @param {string} id - The id. Reference this when applying the filter.
   * @returns {object} The created filter.
   */
  createFilter(id) {
    this.#isMainSVG();

    let filter = new SvJs('filter');
    filter.set({
      id: id,
      x: '-25%',
      y: '-25%',
      width: '150%',
      height: '150%',
      filterUnits: 'userSpaceOnUse',
      color_interpolation_filters: 'sRGB'
    });

    let defs = this.#defsCheck();
    defs.appendChild(filter.element);

    return filter;
  }

  /**
   * Creates a gradient and appends it to the defs element.
   * 
   * @chainable
   * @param {string} id - The id. Reference this when applying the gradient.
   * @param {string} type - Accepts linear or radial.
   * @param {array} colours - An array of gradient colours to be applied equidistantly.
   * @param {number} [rotation = 45] - The angle of rotation. Ignored if gradient is radial.
   * @returns {object} The created gradient.
   */
  createGradient(id, type, colours, rotation = 45) {
    this.#isMainSVG();
    
    let gradient = new SvJs(`${type}Gradient`);
    gradient.set({ id: id });

    if (type === 'linear') {
      gradient.set({ gradientTransform: `rotate(${rotation})` });
    }

    for (let i = 0; i < colours.length; i += 1) {
      gradient.create('stop').set({
        stop_color: colours[i],
        offset: i * (100 / (colours.length - 1)) / 100
      });
    }

    let defs = this.#defsCheck();
    defs.appendChild(gradient.element);

    return gradient;
  }

  /**
   * Creates a pattern and appends it to the defs element.
   * 
   * @chainable
   * @param {string} id - The id. Reference this when applying the gradient.
   * @param {number} width - The width of the pattern.
   * @param {number} height - The height of the pattern.
   * @returns {object} The created pattern element.
   */
  createPattern(id, width, height) {
    this.#isMainSVG();
    
    let pattern = new SvJs('pattern');
    pattern.set({
      id: id,
      x: 0,
      y: 0,
      width: width,
      height: height,
      patternUnits: 'userSpaceOnUse'
    });

    let defs = this.#defsCheck();
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
   * @param {string} attribute - The attribute.
   * @returns {*} the attribute value.
   */
  get(attribute) {
    return this.element.getAttributeNS(null, attribute);
  }

  /**
   * Get a given element's centre { x, y } co-ordinates.
   * 
   * @returns {object} the centre.x and centre.y co-ordinates.
   */
  getCentre() {
    let bbox = this.element.getBBox();
    let cx = bbox.x + (bbox.width / 2);
    let cy = bbox.y + (bbox.height / 2);
    return { x: cx, y: cy };
  }

  /**
   * Move an element to a desired position with respect to its centre.
   * 
   * @chainable
   * @param {number} x - The target x co-ordinate.
   * @param {number} y - The target y co-ordinate.
   * @returns {object} itself.
   */
  moveTo(x, y) {
    let c = this.getCentre();
    let t = this.#createTransform();
    
    t.setTranslate(x - c.x, y - c.y);

    this.#addTransform(t);
    
    return this;
  }

  /**
   * Rotate an element around a specified origin point (the element centre by default).
   * 
   * @chainable
   * @param {number} angle - The angle of rotation.
   * @param {number} [cx] - The origin x co-ordinate.
   * @param {number} [cy] - The origin y co-ordinate.
   * @returns {object} itself.
   */
  rotate(angle, cx = null, cy = null) {
    let c = this.getCentre();
    let t = this.#createTransform();
    cx = (cx === null) ? c.x : cx;
    cy = (cy === null) ? c.y : cy;

    t.setRotate(angle, cx, cy);

    this.#addTransform(t);
    
    return this;
  }

  /**
   * Saves and downloads the SVG markup.
   */
  save() {
    let name = prompt('Enter the file name', 'sketch.svg');
    if (name !== null) {
      let a = document.createElement('a');
      a.download = name;
      let data = this.element.outerHTML;
      let file = new Blob([data], { type: 'text/plain;charset=utf-8' });
      a.href = URL.createObjectURL(file);
      a.click();
    } else {
      return;
    }
  }

  /**
   * Scale an element by a desired proportion.
   * 
   * @chainable
   * @param {number} sx - The amount to scale on the x-axis.
   * @param {number} [sy] - The amount to scale on the y-axis. Defaults to sx if not supplied.
   * @returns {object} itself.
   */
  scale(sx, sy = null) {
    let c = this.getCentre();
    let t1 = this.#createTransform();
    let t2 = this.#createTransform();

    sy = (sy === null) ? sx : sy;
    t1.setTranslate((1 - sx) * c.x, (1 - sy) * c.y);
    t2.setScale(sx, sy);
    
    this.#addTransform(t1);
    this.#addTransform(t2);
    
    return this;
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
   * @param {function} callback - An optional callback function to trigger whenever the cursor moves.
   * @returns {object} itself.
   */
  trackCursor(callback = null) {
    this.#isMainSVG();

    let point = new DOMPoint();

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

    if (callback !== null) {
      this.element.addEventListener('pointermove', callback);
    }

    return this;
  }

  /**
   * Appends an SVG transform object to a transform list.
   * 
   * @param {object} transform - An SVGTransform object.
   */
  #addTransform(transform) {
    this.element.transform.baseVal.appendItem(transform);
  }

  /**
   * Alows for the creation of a cumulative transform.
   * 
   * @returns {object} An SVGTransform object.
   */
  #createTransform() {
    let root = new SvJs();
    return root.element.createSVGTransform();
  }

  /**
   * Checks if the def element already exists, and creates it if it doesn't.
   * 
   * @returns {object} The defs element.
   */
  #defsCheck() {
    let defs;
    if (document.querySelector('defs')) {
      defs = document.querySelector('defs');
    } else {
      defs = new SvJs('defs').element;
      this.element.prepend(defs);
    }
    return defs;
  }

  /**
   * Check if the element is the main SVG element.
   * 
   * @throws {error} if the element is not the main SVG.
   */
  #isMainSVG() {
    if (this.element.nodeName !== 'svg') {
      throw new Error('This function can only be called on the main SVG element.');
    }
  }

  /**
   * Check if the created SVG element is valid.
   */
  #isValid() {
    const elementToString = Object.prototype.toString.call(this.element).toLowerCase();

    if (elementToString !== `[object svg${this.element.nodeName.toLowerCase()}element]`) {
      throw new Error(`Invalid SVG element: ${this.element.nodeName}`); 
    }
  }
}

export { SvJs };

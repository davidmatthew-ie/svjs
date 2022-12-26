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
   * Create a gradient and append it to the defs element (which it creates if it doesn't exist).
   * 
   * @param {string} id - The id. Reference this when applying the gradient.
   * @param {string} type - Accepts linear or radial.
   * @param {number} rotation - The angle of rotation. 
   * @param {string} units - Accepts userSpaceOnUse or objectBoundingBox.
   * @returns {object} The created gradient element.
   */
  createGradient(id, type = 'linear', rotation = 45, units = 'objectBoundingBox') {
    if (this.elementName !== 'svg') {
      throw new Error('This function can only be called on the main SVG element.');
    }
    
    const gradient = new SvJs(`${type}Gradient`);
    gradient.set({
      id: id,
      gradientUnits : `${units}`,
      gradientTransform: `rotate(${rotation})`
    });

    const defs = document.querySelector('defs') ?
      document.querySelector('defs')
      : this.create('defs').element;

    defs.appendChild(gradient.element);

    return gradient;
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
   * Set the attribute values of an SVG element.
   * 
   * @chainable
   * @param {object} attributes - An object of attribute value pairs.
   * @returns {object} itself.
   */
  set(attributes) {
    for (let key in attributes) {
      this.element.setAttributeNS(null, key, attributes[key]);
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
    if (this.elementName !== 'svg') {
      throw new Error('This function can only be called on the main SVG element.');
    }

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

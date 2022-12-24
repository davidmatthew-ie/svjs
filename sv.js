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
   * @param {String} element - The name of the SVG element to create. 
   * @param {String} namespace - The namespace url to reference.
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
   * @param {Node} node - A HTML or SVG parent node.
   */
  addTo(node) {
    node.appendChild(this.element);
  }

  /**
   * Create and append an SVG child element.
   * 
   * @param {String} element - The name of the SVG element to create.
   * @returns {Object} The created SVG child element.
   */
  create(element) {
    this.child = new SVJ(element);
    this.element.appendChild(this.child.element);

    return this.child;
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
   * @param {Object} attributes - An object of attribute value pairs.
   */
  set(attributes) {
    for (let key in attributes) {
      this.element.setAttributeNS(null, key, attributes[key]);
    }
  }

  /**
   * Get accurate cursor position x and y values via matrix transformation.
   * 
   * @param {Event} event - The global window event object.
   * @returns {Array} An array containing the x and y value.
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
  }

  /**
   * Check if the created SVG element is valid.
   * 
   * @param {String} element - The SVG element name to validate.
   */
  #isValid(element) {
    const elementToString = Object.prototype.toString.call(this.element).toLowerCase();

    if (elementToString !== `[object svg${element}element]`) {
      throw new Error('Invalid SVG element.');
    }
  }
}

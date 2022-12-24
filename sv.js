/**
 * A class to instantiate a new SvJs element.
 */
export default class SvJs {

  /**
   * Class fields.
   */
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

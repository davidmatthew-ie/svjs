/**
 * A class to instantiate a new SVJ element.
 */
export default class SVJ {

  // Class fields.
  namespace = 'http://www.w3.org/2000/svg';

  /**
   * Create an SVG element.
   * 
   * @param {SVGElement} element The SVG element to create. 
   * @param {String} namespace The namespace url to reference.
   */
  constructor(element = 'svg', namespace = this.namespace) {
    this.element = document.createElementNS(namespace, element);
    this.#isValid(element);
    if (element === 'svg') this.element.setAttribute('xmlns', namespace);
  }

  /**
   * Get a given attribute's value.
   * 
   * @param {*} attribute The attribute.
   * @returns the attribute value.
   */
  get(attribute) {
    return this.element.getAttributeNS(null, attribute);
  }

  /**
   * Set the attribute values of an SVGElement.
   * 
   * @param {Object} attributes An object of attribute value pairs.
   */
  set(attributes) {
    for (let key in attributes) {
      this.element.setAttributeNS(null, key, attributes[key]);
    }
  }

  /**
   * Add the SVGElement to the specified node.
   * 
   * @param {Node} node A HTML or SVG parent node.
   */
  addTo(node) {
    node.appendChild(this.element);
  }

  /**
   * Create and append an SVG child element.
   * 
   * @param {SVGElement} element The SVGElement to create.
   * @returns The created SVG child element.
   */
  create(element) {
    this.child = new SVJ(element);
    this.element.appendChild(this.child.element);
    return this.child;
  }

  /**
   * Check if the created SVGElement is valid.
   * 
   * @param {SVGElement} element The SVGElement to validate.
   */
  #isValid(element) {
    const elementToString = Object.prototype.toString.call(this.element).toLowerCase();
    if (elementToString !== `[object svg${element}element]`) throw new Error('Invalid SVG element.');
  }
}

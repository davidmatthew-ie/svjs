/**
 * A class to instantiate a new SVJ element.
 */
export default class SVJ {

  namespace = 'http://www.w3.org/2000/svg';

  constructor(element = 'svg', namespace = this.namespace) {
    this.element = document.createElementNS(namespace, element);
    if (element === 'svg') {
      this.element.setAttribute('xmlns', namespace);
    }
  }

  get(attribute, namespace = null) {
    return this.element.getAttributeNS(namespace, attribute);
  }

  set(attributes, namespace = null) {
    for (let key in attributes) {
      this.element.setAttributeNS(namespace, key, attributes[key]);
    }
  }

  addTo(node) {
    node.appendChild(this.element);
  }

  create(element) {
    this.child = new SVJ(element);
    this.element.appendChild(this.child.element);
    return this.child;
  }
}

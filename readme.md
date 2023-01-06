# SvJs

SvJs is a very light object-oriented library to help generative artists working with SVG.

It is a thin wrapper over the real SVG spec with some useful generative functions included. This keeps its footprint extremely small whilst maintaining fidelity to the SVG spec.

* [Installation](#installation)
* [Core SVG Functions](#core-svg-functions)

## Installation

### NPM

To install via npm:

```
npm install svjs
```

You can then import it either via the `dist` folder (minified, with all modules included) or import just the modules you want via the `src` folder.

### CDN

To install via the CDN link, ensure your script tag has `type="module"` declared. Then import it as follows (replace `latest` with a specific version if you prefer):

```javascript
import { SvJs } from 'https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js';
```

## Core SVG Functions

The `SvJs` class located at `src/sv.js` contains the core SVG-related functionality.

### Method List:

* [new SvJs()](#new-svjs)
* [addTo()](#addto)
* [create()](#create)
* [createGradient](#creategradient)

<hr>

### `new SvJs()`

Class constructor. Creates a new SVG element.

Throws an error if the argument passed isn't a valid SVG element.

_Paramaters:_
* element {object} (optional) - The SVG element you want to create. Leave blank for SVG.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// To create a parent SVG element, no arguments are required.
const svg = new SvJs(); 

// To create a specific element, use the element name as the argument.
const rect = new SvJs('rect'); 
```

<hr>

### `addTo()`

Add (or append) one element to another.

_Paramaters:_
* node {object} (required) - A HTML or SVG parent node.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Appends the main svg to an element with the id of 'container'.
svg.addTo(document.getElementById('container'));

// Appends the rect element to the parent SVG.
rect.addTo(svg);
```

<hr>

### `create()`

This is a shortcut method to create and append a child element. It is essentially the same as calling a `new SvJs(element)` and afterwards calling `addTo(parentElement)`.

Throws an error if the argument passed isn't a valid SVG element.

_Paramaters:_
* element {string} (required) - The SVG element you want to create.

_Returns:_ the created child element.

_Chainable:_ yes.

```javascript
// This is an alternative way of creating the rect and appending it to the svg.
const rect = svg.create('rect');
```

<hr>

### `createGradient()`

Shortcut method to create a gradient and append it to the defs element. If will create a defs element if it doesn't already exist.

Can only be called by the parent SVG element. Throws error otherwise.

_Parameters:_
* id {string} (required) Reference this when applying the gradient.
* type {string} (optional) - Accepts linear or radial. Default is linear.
* rotation {number} (optional) - The angle of rotation. Default is 45.
* units {string} (optional) - Accepts userSpaceOnUse or objectBoundingBox. Default is objectBoundingBox.

_Returns:_ itself (the created gradient element).

_Chainable:_ yes.

```javascript
const grad = svg.createGradient('myGradient', 'linear', 60);

grad.create('stop').set({ offset: '0%', stop_color: 'white' });
grad.create('stop').set({ offset: '100%', stop_color: 'purple' });

rect.set({ fill: 'url(#myGradient)' });
```

<hr>

### `createPattern()`

A shortcut method to create a pattern and append it to the defs element. If will create a defs element if it doesn't already exist. The actual pattern elements can then be added as children.

Can only be called by the parent SVG element. Throws error otherwise.

_Parameters:_
* id {string} (required) Reference this when applying the pattern.

_Returns:_ itself (the created pattern element).

_Chainable:_ yes.

<hr>

### `delete()`

Removes the element.

_Parameters:_ none.

_Returns:_ undefined.

_Chainable:_ no.

<hr>

### `get()`

Fetches the value of the attribute, which is supplied as the argument.

_Parameters:_
* attribute {*} (required) The attribute.

_Returns:_ The attribute's value.

_Chainable:_ no.

```javascript
// Get the fill value of our rect element.
rect.get('fill');
```

<hr>

### `set()`

Set the attribute value(s) of an SVG element.

For attributes that contain a dash (e.g. stroke-width), use an underscore instead (stroke_width).

_Parameters:_
* attributes {object} (required) The attribute-value pair(s), supplied as an object.

_Returns:_ The original element.

_Chainable:_ yes.

```javascript
// Create a circle element and set its attributes.
const circle = svg.create('circle');

circle.set({
  cx: 500,
  cy: 500,
  r: 250,
  fill: 'crimson',
  stroke: 'gold',
  stroke_width: 5
});
```

<hr>

### `trackCursor()`

Update the `cursorX` and `cursorY` properties on the main SVG element. These are set to null by default; calling `trackCursor()` activates the event listeners needed to update them.

Can only be called by the parent SVG element. Throws error otherwise.

Accurate cursor tracking is done via matrix transformation (normal cursor tracking using `clientX` and `clientY` values don't work with SVG). Compatible with touch devices.

Values of `cursorX` and `cursorY` are relative to the `viewBox`.

_Parameters:_ none.

_Returns:_ itself (the parent SVG element).

_Chainable:_ yes.

```javascript
// Create an svg element and activate cursor tracking.
const svg = new SvJs();

svg.set({ viewBox: '0 0 1000 1000' }).trackCursor();

console.log(svg.cursorX, svg.cursorY);
// -> 210, 502
```

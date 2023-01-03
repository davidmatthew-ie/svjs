# SvJs

SvJs is a very light object-oriented library to help generative artists working with SVG.

It is a thin wrapper over the real SVG spec with some useful generative functions included. This keeps its footprint extremely small whilst maintaining fidelity to the SVG spec.

## Installation

### NPM

To install via npm:

```
npm install svjs
```

You can then import it either via the `dist` folder (minified, with all modules included) or import just the modules you want via the `src`folder.

### CDN

To install via the CDN link, ensure your script tag has `type="module"` declared. Then import it as follows (replace `latest` with a specific version if you prefer):

```javascript
import { SvJs } from 'https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js';
```

## How to Use

### Core SVG Functions

The `SvJs` class located at `src/sv.js` contains the core SVG-related functionality.

Any of the class methods that return themselves are chainable.

#### Method List:

* [new SvJs()](#new-svjs)
* [addTo()](#addto)
* [create()](#create)
* [createGradient](#creategradient)

<hr>

#### new SvJs()

Class constructor. Creates a new SVG element.

_Paramaters:_
* element (optional) - The SVG element you want to create. Leave blank for SVG.

_Returns:_ itself.

```javascript
// To create a parent SVG element, no arguments are required.
const svg = new SvJs(); 

// To create a specific element, use the element name as the argument.
const rect = new SvJs('rect'); 
```

<hr>

#### addTo()

Add (or append) one element to another.

_Paramaters:_
* node (required) - A HTML or SVG parent node.

_Returns:_ itself.

```javascript
// Appends the main svg to an element with the id of 'container'.
svg.addTo(document.getElementById('container'));

// Appends the rect element to the parent SVG.
rect.addTo(svg);
```

<hr>

#### create()

This is a shortcut method to create and append a child element. It is essentially the same as calling a `new SvJs(element)` and afterwards calling `addTo(parentElement)`.

_Paramaters:_
* element (required) - The SVG element you want to create.

_Returns:_ itself.

```javascript
// This is an alternative way of creating the rect and appending it to the svg.
const rect = svg.create('rect');
```

<hr>

#### createGradient()

```javascript
```


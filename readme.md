# SvJs

SvJs is a very light object-oriented library to help generative artists working with SVG.

It is a thin wrapper over the real SVG spec with some useful generative functions included. This keeps its footprint extremely small whilst maintaining fidelity to the SVG spec.

It is inspired by the [gySVG](https://github.com/graphery/graphery/tree/master/svg) library, but takes a different approach under the hood and is more geared towards generative art. 

* [Installation](#installation)
* [Core SVG Functions](#core-svg-functions)
* [Generative Functions](#generative-functions)
* [Noise Module](#noise-module)

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
// Import just the core functionality.
import { SvJs } from 'https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js';

// Import the full library.
import { SvJs, Gen, Noise } from 'https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js';
```

## Core SVG Functions

The `SvJs` class located at `src/sv.js` contains the core SVG-related functionality.

### Method List:

* [new SvJs()](#new-svjs)
* [addEventListener()](#addeventlistener)
* [addTo()](#addto)
* [animate()](#animate)
* [content()](#content)
* [create()](#create)
* [createCurve()](#createcurve)
* [createFilter()](#createfilter)
* [createGradient()](#creategradient)
* [createPattern()](#createpattern)
* [delete()](#delete)
* [get()](#get)
* [getCentre()](#getcentre)
* [moveTo()](#moveto)
* [rotate()](#rotate)
* [save()](#save)
* [scale()](#scale)
* [set()](#set)
* [trackCusor()](#trackcursor)

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

### `addEventListener()`

An alias of the DOM addEventListener method.

_Paramaters:_
* type {Event} (required) The event type.
* callback {function} (required) The callback function.

_Returns:_ itself.

_Chainable:_ yes.

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

### `animate()` 

Animate an element using the Web Animations API.

_Paramaters:_
* keyframes {(array|object)} (required) An array of keyframe objects, or an object of keyframe arrays.
* options {object|number} (required) An object containing timing properties, or a single number for the duration.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Set up the keyframes (in this case an object of arrays).
let keyframes = {
  transform: [
    'rotate(0deg) scale(1, 1)',
    'rotate(180deg) scale(0.5, 1.5)',
    'rotate(360deg) scale(1, 1)'
  ]
};

// Set up the options.
let options = {
  duration: 5000,
  iterations: Infinity
};

// Apply the animation to an SvJs element.
circle.animate(keyframes, options);
```

<hr>

### `content()` 

Inserts content within an element. Useful for textual and style elements.

_Paramaters:_
* text {string} (required) The content to insert.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Add content to a text element.
let text = svg.create('text');
text.content('Hello SVG World.');

// Use content to apply styles to all paths.
svg.create('style').content(`
  path {
    fill: none;
    stroke-width: 0.75;
    stroke-linecap: round;
  }`
);
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

### `createCurve()`

Creates a smooth, open bezier curve from an array of points.

_Parameters:_
* points {array} (required) A two-dimensional array of `[[x,y], [x,y]...]` points.
* curveFactor {number} (optional) 0 means no curve. Default is 1.

_Returns:_ itself (the created path element).

_Chainable:_ yes.

```javascript
// Given a viewBox of '0 0 1000 1000', the below creates a closed circular curve.
const pts = [
  [500, 300],
  [300, 500],
  [500, 700],
  [700, 500],
];

const path = svg.createCurve(pts, 1.66);
```

<hr>

### `createFilter()`

Creates a filter and appends it to the defs element.

_Parameters:_
* id {string} (required) The id. Reference this when applying the filter.

_Returns:_ itself (the created filter element).

_Chainable:_ yes.

```javascript
// Initialise the filter.
let filter = svg.createFilter('blur');

// Create a blur effect.
filter.create('feGaussianBlur').set({ stdDeviation: 10 });

// Apply the filter to a SvJs element called circle.
circle.set({ filter: 'url(#blur)' });
```

<hr>

### `createGradient()`

Shortcut method to create a gradient and append it to the defs element. If will create a defs element if it doesn't already exist.

Can only be called by the parent SVG element. Throws error otherwise.

_Parameters:_
* id {string} (required) Reference this when applying the gradient.
* type {string} (required) - Accepts linear or radial.
* colours {array} (required) - An array of gradient colours to be applied equidistantly.
* rotation {number} (optional) - The angle of rotation (ignored if gradient is radial). Default is 45.

_Returns:_ itself (the created gradient element).

_Chainable:_ yes.

```javascript
// Create a sunset-coloured gradient and apply it to a rect.
const grad = svg.createGradient('sunset', 'linear', ['red', 'orange', 'yellow'], 90);

rect.set({ fill: 'url(#sunset)' });
```

<hr>

### `createPattern()`

A shortcut method to create a pattern and append it to the defs element. If will create a defs element if it doesn't already exist. The actual pattern elements can then be added as children.

Can only be called by the parent SVG element. Throws error otherwise.

_Parameters:_
* id {string} (required) Reference this when applying the pattern.
* width {number} (required) The width of the pattern.
* height {number} (required) The height of the pattern.

_Returns:_ itself (the created pattern element).

_Chainable:_ yes.

```javascript
// Create a pattern consisting of two rect elements.
const pattern = svg.createPattern('myPattern', 100, 100);

pattern.create('rect').set({ x: 0, y: 0, width: 50, height: 50, fill: '#333' });
pattern.create('rect').set({ x: 50, y: 50, width: 50, height: 50, fill: '#666' });

rect.set({ fill: 'url(#myPattern)' });
```

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
* attribute {string} (required) The attribute.

_Returns:_ The attribute's value.

_Chainable:_ no.

```javascript
// Get the fill value of our rect element.
rect.get('fill');
```

<hr>

### `getCentre()`

Get a given element's centre { x, y } co-ordinates. Particularly useful for groups.

_Parameters:_ none.

_Returns:_ {object} the centre.x and centre.y co-ordinates.

<hr>

### `moveTo()`

Move an element to a desired position with respect to its centre. Particularly useful for groups.

_Paramaters:_
* x {number} (required) - The target x co-ordinate.
* y {number} (required) - The target y co-ordinate.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Move a rect to the centre of a 1000 x 1000 viewBox.
rect.moveTo(500, 500);
```

<hr>

### `rotate()`

Rotate an element around a specified origin point (the element centre by default).

_Paramaters:_
* angle {number} (required) - The angle of rotation.
* cx {number} (optional) - The origin x co-ordinate.
* cy {number} (optional) - The origin y co-ordinate.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Rotate a rect by 90 degrees around its own centre.
rect.rotate(90);
```

<hr>

### `save()`

Saves the generated `<svg>` markup as a downloadable file.

_Parameters:_ none.

_Returns:_ undefined.

_Chainable:_ no.

```javascript
// Call the save method by pressing the 's' key.
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyS') {
    svg.save();
  }
});
```

<hr>

### `scale()`

Scale an element by a desired proportion.

The element is scaled from its centre, which involves an additional translation.

_Paramaters:_
* sx {number} (required) - The amount to scale on the x-axis.
* sy {number} (optional) - The amount to scale on the y-axis. Defaults to sx if not supplied.

_Returns:_ itself.

_Chainable:_ yes.

```javascript
// Scale a rect to double its original size.
rect.scale(2);

// Scale a rect differntly along the x and y axis.
rect.scale(1.5, 2.5);
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
-> 210, 502
```

<hr>

## Generative Functions

The generative functions can be imported via the optional `Gen` module. They are especially useful for generative art.

```javascript
import { Gen } from '../../svjs/src/index.js';
```

### Function List

* [chance()](#chance)
* [constrain()](#constrain)
* [dist()](#dist)
* [gaussian()](#gaussian)
* [interp()](#interp)
* [map()](#map)
* [pareto()](#pareto)
* [random()](#random)

<hr>

### `chance()`

Return true if the supplied % is higher than a randomised %. If two arguments supplied, they are interpreted as odds.

_Parameters:_
* n1 {number} (optional) - The chance of the return value being true. 50 by default.
* n2 {number} (optional) - Default is null. If not null, both arguments are interpreted as odds in the form n1 to n2.

_Returns:_ {boolean} true or false.

```javascript
// The below returns true 60% of the time.
Gen.chance(60);

// There is a 7 to 2 chance of this returning true.
Gen.chance(7, 2);
```

<hr>

### `constrain()`

Constrains (or clamps) a value between a minimum and maximum value.

_Parameters:_
* num {number} (required) The number to constrain.
* min {number} (required) The minimum limit.
* max {number} (required) The maximum limit.

_Returns:_ {number} The constrained number.

```javascript
Gen.constrain(50, 5, 10);
-> 10

Gen.constrain(2, 5, 10);
-> 5

Gen.constrain(6, 5, 10);
-> 6
```

<hr>

### `dist()`

Calculates the distance between two points using the Pythagorean theorem.

_Parameters:_
* x1 {number} (required) The first x co-ordinate.
* y1 {number} (required) The first y co-ordinate.
* x2 {number} (required) The second x co-ordinate.
* y2 {number} (required) The second y co-ordinate.

_Returns:_ {number} The distance between (x1, y1) and (x2, y2).

```javascript
Gen.dist(10, 12, 40, 50);
-> 48.41487374764082
```

<hr>

### `gaussian()`

Gets a random number based on the Box-Muller gaussian transform.

By default, it typically returns results within a range of -3 to +3.

_Parameters:_
* mean {number} (optional) - The mean, 0 by default.
* sigma {number} (optional) - Sigma refers to the standard deviation, 1 by default.
* float {boolean} (optional) - Default is true. Set to false to return an integer.

_Returns:_ {number} The random gaussian.

```javascript
// By default, uses a mean of 0 and sigma of 1.
Gen.gaussian();
-> 1.4712050780435197

// Specify a mean of 5 and sigma of 2.
Gen.gaussian(5, 2);
-> 7.169042426896327
```

<hr>

### `interp()`

Interpolates linearly between two values. Returns the midway point (0.5) by default.

_Parameters:_
* start {number} (required) The first value.
* stop {number} (required) The second value.
* amount {number} (optional) The amount of interpolation, between 0.0 and 1.0. Default is 0.5.

_Returns:_ {number} interpolated value.

```javascript
Gen.interp(5, 10);
-> 7.5

Gen.interp(5, 10, 0.4);
-> 7

Gen.interp(5.25, 10.95);
-> 8.1
```

<hr>

### `map()`

Re-maps a number from one range to another.

_Parameters:_
* value {number} (required) The value to be converted.
* start1 {number} (required) The lower bound of the current range.
* stop1 {number} (required) The upper bound of the current range.
* start2 {number} (required) The lower bound of the target range.
* stop2 {number} (required) The upper bound of the target range.
* float {boolean} (optional) - Default is true. Set to false to return an integer.

_Returns:_ {number} The remapped number.

```javascript
Gen.map(5, 0, 10, 0, 100);
-> 50
```

<hr>

### `pareto()`

Gets a random number based on the pareto power law distribution (80-20 rule).

_Parameters:_
* min {number} (required) - The minimum value to be returned.
* float {boolean} (optional) - Default is true. Set to false to return an integer.

_Returns:_ {number} The random pareto number.

```javascript
// Return a pareto-distributed integer, not less than 20.
Gen.pareto(20, false);
-> 32
```

<hr>

### `random()`

Gets a random number between a minimum and maximum value, or picks a random item from an array.

Without parameters, it will return a float between 0 and 1.

_Parameters:_
* min {number|array} (optional) The minimum value (result is equal to or higher than this). Default is 0. If array, an item is randomly chosen.
* max {number} (optional) The maximum value (result is equal to or lower than this). Default is 1.
* float {boolean} (optional) Default is false (unless no arguments provided). Set to true to return a floating point number.

_Returns:_ {number} The random number or array item.

```javascript
// Return a float between 0 and 1.
Gen.random();
-> 0.5682831319665758

// Return a float between 50 and 100.
Gen.random(50, 100);
-> 87.98188644344106

// Return a whole number between 10 and 20.
Gen.random(10, 20, false);
-> 17

// Return a random item from an array.
let rainbow = ['red', 'yellow', 'pink', 'green', 'purple', 'orange', 'blue'];

Gen.random(rainbow);
-> 'purple'
```

<hr>

## Noise Module

This small module is an implementation of Ken Perlin's noise algorithm in 2D.

It consists of a constructor and a single `get()` method.

<hr>

### `new Noise()`

Class constructor. Creates an instance of the Noise class.

_Paramaters:_ none.

```javascript
// Create an instance of the Noise class.
const noise = new Noise();
```

<hr>

### `get()`

Get the noise value at the specified co-ordinates.

_Parameters:_
* x {number} (required) The noise x co-ordinate.
* y {number} (optional) The noise y co-ordinate. Defaults to 0.

_Returns:_ {number} the noise value (float between -1 and 1).

```javascript
// Instantiate a Noise instance and fetch the noise value at the specified co-ordinates.
const n = new Noise();
const value = n.get(999);
```

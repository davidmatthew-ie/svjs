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

To install via the CDN link, ensure your script tag has `type="module"` declared. Then import it as follows:

```javascript
import { SvJs } from 'https://cdn.jsdelivr.net/npm/svjs@latest/dist/svjs.min.js';
```


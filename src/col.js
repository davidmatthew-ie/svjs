/**
 * A collection of useful colour-related functions.
 */
const col = {
  /**
   * Generates a random colour. Optionally provide some of the arguments for a more specific result.
   * 
   * @param {number} hue - The colour's hue, between 0 and 360. Optional.
   * @param {string} sat - The percentage saturation. Optional.
   * @param {string} lightness - The percentage lightness. Optional.
   * @param {string} alpha - The alpha percentage. Optional.
   * 
   * @returns {*} A random colour in the hsl format - hsl(h s l / a).
   */
  random: function(hue = null, sat = null, lightness = null, alpha = null) {
    let h = (hue !== null) ? hue : Math.round(Math.random() * 360);
    let s = (sat !== null) ? sat :`${Math.round(Math.random() * 100)}%`;
    let l = (lightness !== null) ? lightness : `${Math.round(Math.random() * 100)}%`;
    let a = (alpha !== null) ? alpha : `${Math.round(Math.random() * 100)}%`;

    return `hsl(${h} ${s} ${l} / ${a})`;
  }
}

export default col;

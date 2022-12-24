/**
 * A collection of useful functions for generative art.
 */
const gen = {
  /**
   * Constrains (or clamps) a value between a minimum and maximum value.
   * 
   * @param {number} num - The number to constrain.
   * @param {number} min - The minimum limit.
   * @param {number} max - The maximum limit.
   * @returns {number} The constrained number.
   */
  constrain: function(num, min, max) {
    let n = Math.min(Math.max(num, min), max);
    return n;
  }
}

export default gen;
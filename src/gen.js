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
    let number = Math.min(Math.max(num, min), max);
    return number;
  },

  /**
   * Gets a random number between a minimum and maximum value.
   * 
   * @param {number} min - Result is equal to or higher than this.
   * @param {number} max - Result is lower than this.
   * @param {boolean} integer - Default is true. Set to false to return a float.
   * @returns {number} The randomised integer.
   */
  random: function(min, max, integer = true) {
    let random = Math.random() * (max - min) + min;
    let number = integer ? Math.floor(random) : random;
    return number;
  }
}

export default gen;

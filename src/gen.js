/**
 * A collection of useful functions for generative art.
 */
const Gen = {
  /**
   * Constrains (or clamps) a value between a minimum and maximum value.
   * 
   * @param {number} num - The number to constrain.
   * @param {number} min - The minimum limit.
   * @param {number} max - The maximum limit.
   * @returns {number} The constrained number.
   */
  constrain: function(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  /**
   * Calculates the distance between two points using the Pythagorean theorem.
   * 
   * @param {number} x1 - The first x co-ordinate.
   * @param {number} y1 - The first y co-ordinate.
   * @param {number} x2 - The second x co-ordinate.
   * @param {number} y2 - The second y co-ordinate.
   * @returns {number} The distance between (x1, y1) and (x2, y2).
   */
  dist: function(x1, y1, x2, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  },

  /**
   * Interpolates linearly between two values. Returns the midway point (0.5) by default.
   * 
   * @param {number} start - The first value.
   * @param {number} stop - The second value.
   * @param {number} [amount = 0.5] - The amount of interpolation, between 0.0 and 1.0.
   * @returns {number} The interpolated value.
   */
  interp: function(start, stop, amount = 0.5) {
    return amount * (stop - start) + start;
  },

  /**
   * Re-maps a number from one range to another.
   *
   * @param {number} value - The value to be converted.
   * @param {number} start1 - The lower bound of the current range.
   * @param {number} stop1 - The upper bound of the current range.
   * @param {number} start2 - The lower bound of the target range.
   * @param {number} stop2 - The upper bound of the target range.
   * @returns {number} The remapped number.
   */
  mapRange: function(value, start1, stop1, start2, stop2) {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  },

  /**
   * Gets a random number between a minimum and maximum value, or picks a random item from an array.
   * 
   * @param {(number|array)} [min = 0] - Result is equal to or higher than this. If array, an item is randomly chosen.
   * @param {number} [max = 1] - Result is equal to or lower than this.
   * @param {boolean} [integer = false] - Set to true to return an integer.
   * @returns {*} The randomised number or array item.
   */
  random: function(min = 0, max = 1, integer = false) {
    if (Array.isArray(arguments[0])) {
      let arr = arguments[0];
      return arr[Math.round(Math.random() * (arr.length - 1))];
    } else {
      let random = Math.random() * (max - min) + min;
      return integer ? Math.round(random) : random;
    }
  }
}

export { Gen };

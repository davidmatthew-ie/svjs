/**
 * A collection of useful functions for generative art.
 */
const Gen = {
  /**
   * Return true if the supplied % is higher than a randomised %. If two arguments supplied, they are interpreted as odds.
   * 
   * @param {number} [n1 = 50] - The chance of the return value being true. 50 by default.
   * @param {number} [n2 = null] - If not null, both arguments are interpreted as odds in the form n1 to n2.
   * @returns {boolean}
   */
  chance: function(n1 = 50, n2 = null) {
    let n = (n2 !== null) ? n2 / (n1 + n2) * 100 : n1;
    return n > (Math.random() * 100);
  },

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
   * Gets a random number based on the Box-Muller gaussian transform.
   * By default, it typically returns results within a range of -3 to +3.
   * 
   * @param {number} [mean = 0] - The mean, 0 by default.
   * @param {number} [sigma = 1] - Sigma refers to the standard deviation, 1 by default.
   * @returns {number} The random gaussian.
   */
  gaussian: function(mean = 0, sigma = 1) {
    let u = 1 - Math.random();
    let v = Math.random();
    let z = Math.cos(Math.PI * v) * Math.sqrt(-Math.log(u));
    return z * sigma + mean;
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
   * @param {boolean} [float = true] - Set to false to return an integer.
   * @returns {*} The randomised number or array item.
   */
  random: function(min = 0, max = 1, float = true) {
    if (Array.isArray(arguments[0])) {
      let arr = arguments[0];
      return arr[Math.round(Math.random() * (arr.length - 1))];
    } else {
      let random = Math.random() * (max - min) + min;
      return float ? random : Math.round(random);
    }
  }
}

export { Gen };

/**
 * Constrains a number between a range specified by a minumum and maximum
 * @param {Number} num the number to constrain
 * @param {Number} min the range minimum
 * @param {Number} max the range maximum
 */
const constrain = (num, min, max) => Math.min(Math.max(num, min), max);

export default constrain;

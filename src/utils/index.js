module.exports = {
  /**
   * Capitalize string
   * @param {string} string
   * @returns {string}
   */
  capitalize: (string) => string
    .toLowerCase()
    .replace(/(\s|^)\w/g, (str) => str.toUpperCase()),
  /**
   * Normalize string
   * @param {string} string
   * @returns {string}
   */
  normalize: (string) => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
};

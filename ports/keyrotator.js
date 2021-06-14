const fs = require('fs');
const logger = require('signale');
const path = require('path');
const yaml = require('js-yaml');

const defaultPath = process.env.KEYROTATOR_FILE || path.join(
  __dirname, '..', 'keys.yml',
);

/**
 * @typedef KeyPair
 * @type {Object}
 * @property {String} key Shopify API key
 * @property {String} password Shopify API password
 */

class KeyRotator {
  /**
   * Key rotator.
   * @param {Array} keys keys loaded by the KeyStore
   */
  constructor(keys) {
    this.keys = keys;

    // Set up a random initial index;
    this.index = Math.floor(Math.random() * this.count);
  }

  /**
   * @returns {Number} amount of keys loaded
   */
  get count() {
    return this.keys.length;
  }

  /**
   * Return current index of API key list and cycle it.
   * @returns {Number} current index
   */
  cycleIndex() {
    const current = this.index;

    if (current > this.count - 1) {
      this.index = 1;
      return 0;
    }

    this.index = current + 1;
    return current;
  }

  /**
   * @returns {KeyPair|String} API key and password pair or a string.
   */
  get() {
    return this.keys[this.cycleIndex()];
  }
}


class KeyStore {
  /**
   *
   * @param {String} customFilePath custom path to API key YAML file.
   */
  constructor(customFilePath) {
    let keyYaml;
    let loaded = {};
    const keyFilePath = customFilePath || defaultPath;

    this.store = {};

    try {
      keyYaml = fs.readFileSync(keyFilePath).toString();
      loaded = yaml.safeLoad(keyYaml);
    } catch (e) {
      logger.error(`Error opening key file at ${keyFilePath}!`);
      logger.error(e.toString());
      logger.error('No keys have been loaded!');
    }

    // Load a keyrotator for every key object
    Object.entries(loaded).forEach(([key, obj]) => {
      this.store[key] = new KeyRotator(obj);
    });
  }

  /**
   * Get Keyrotator for a service
   * @param {String} key service key, as set in the key YAML file.
   * @returns {KeyRotator} keyrotator for that service
   */
  getKeyRotator(key) {
    return this.store[key];
  }
}

module.exports = {
  store: null,
  getStore() {
    this.store = this.store || new KeyStore();
    return this.store;
  },
  KeyStore,
  KeyRotator,
};

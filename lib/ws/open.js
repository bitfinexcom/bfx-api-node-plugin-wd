'use strict'

const debug = require('debug')('bfx:api:plugins:wd:ws:open')

/**
 * Sets the managed close flag.
 *
 * @memberof module:bfx-api-node-plugin-wd
 * @private
 *
 * @returns {module:bfx-api-node-core.PluginEventHandler} func
 */
const onWSOpenGen = () => ({ state = {} } = {}) => {
  debug('setting managed close flag')

  return {
    ...state,
    managedClose: true
  }
}

module.exports = onWSOpenGen

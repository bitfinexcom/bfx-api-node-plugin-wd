'use strict'

const debug = require('debug')('bfx:api:plugins:wd:manager:ws_destroyed')

/**
 * Clears the reconnect and watchdog timeouts when the socket is destroyed.
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onManagerWSDestroyedGen = (h = {}) => ({ state = {} } = {}) => {
  const { getState } = h
  const { wdTimeout, reconnectTimeout } = getState(state)

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout)
  }

  if (wdTimeout) {
    clearTimeout(wdTimeout)
  }

  debug('cleaned up timeouts')

  return null
}

module.exports = onManagerWSDestroyedGen

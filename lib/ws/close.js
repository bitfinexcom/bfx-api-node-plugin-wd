'use strict'

const debug = require('debug')('bfx:api:plugins:wd:ws:close')

/**
 * Schedules the reconnect timeout.
 *
 * @memberof module:bfx-api-node-plugin-wd
 * @private
 *
 * @param {module:bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {module:bfx-api-node-core.PluginEventHandler} func
 */
const onWSCloseGen = (h = {}, args = {}) => ({ state = {} } = {}) => {
  const { emit } = h
  const { autoReconnect, reconnectDelay } = args
  const { ev } = state

  if (!autoReconnect) {
    return null
  }

  debug('reconnecting in %dms', reconnectDelay)

  const reconnectTimeout = setTimeout(
    emit.bind(null, ev, 'reconnect'),
    reconnectDelay
  )

  return [null, {
    reconnectTimeout,
    isReconnecting: true
  }]
}

module.exports = onWSCloseGen

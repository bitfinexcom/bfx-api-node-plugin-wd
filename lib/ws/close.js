'use strict'

const debug = require('debug')('bfx:api:plugins:wd:ws:close')

/**
 * Schedules the reconnect timeout.
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {bfx-api-node-core.PluginEventHandler} func
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

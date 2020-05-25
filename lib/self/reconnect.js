'use strict'

const debug = require('debug')('bfx:api:plugins:wd:self:reconnect')
const WebSocket = require('ws')
const { reopen } = require('bfx-api-node-core')

/**
 * Either re-opens the socket, clearing the watchdog timeout, or schedules
 * another attempt later as the socket is already closing.
 *
 * If the socket is not closing, no further attempts are made and nothing is
 * done.
 *
 * @memberof module:bfx-api-node-plugin-wd
 * @private
 *
 * @param {module:bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {module:bfx-api-node-core.PluginEventHandler} func
 */
const onSelfReconnectGen = (h = {}, args = {}) => ({ state = {} } = {}) => {
  const { reconnectDelay } = args
  const { emit, getState } = h
  const { ws, ev } = state
  const { wdTimeout } = getState(state)

  if (ws.readyState === WebSocket.CLOSED) {
    debug('opening socket...')

    if (wdTimeout !== null) {
      clearTimeout(wdTimeout)
    }

    return [reopen(state), {
      wdTimeout: null,
      isReconnecting: false
    }]
  } else if (ws.readyState === WebSocket.CLOSING) {
    debug('still closing, trying again in %dms', reconnectDelay)

    const reconnectTimeout = setTimeout(
      emit.bind(null, ev, 'reconnect'),
      reconnectDelay
    )

    return [null, { reconnectTimeout }]
  }

  return [null, {
    isReconnecting: false
  }]
}

module.exports = onSelfReconnectGen

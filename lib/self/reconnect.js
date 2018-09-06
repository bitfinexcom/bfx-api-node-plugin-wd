'use strict'

const debug = require('debug')('bfx:api:plugins:wd:self:reconnect')
const WebSocket = require('ws')
const { reopen } = require('bfx-api-node-core')

module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
  const { reconnectDelay } = args
  const { emit, getState } = h
  const { ws } = state
  const { wdTimeout } = getState(state)

  if (ws.readyState === WebSocket.CLOSED) {
    debug('opening socket...')

    if (wdTimeout !== null) {
      clearTimeout(wdTimeout)
    }

    return [reopen(state), {
      wdTimeout: null,
      isReconnecting: false,
    }]
  } else if (ws.readyState === WebSocket.CLOSING) {
    debug('still closing, trying again in %dms', reconnectDelay)
    setTimeout(
      emit.bind(null, ev, 'reconnect'),
      reconnectDelay
    )
    return null
  }

  return [null, {
    isReconnecting: false,
  }]
}

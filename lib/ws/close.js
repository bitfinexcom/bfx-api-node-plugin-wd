'use strict'

const debug = require('debug')('bfx:api:plugins:wd:ws:close')

module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
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

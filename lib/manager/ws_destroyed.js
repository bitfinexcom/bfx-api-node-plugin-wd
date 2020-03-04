'use strict'

const debug = require('debug')('bfx:api:plugins:wd:manager:ws_destroyed')

module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
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

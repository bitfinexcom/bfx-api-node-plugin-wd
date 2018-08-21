'use strict'

const debug = require('debug')('bfx:api:plugins:wd:self:close')

module.exports = (h = {}) => ({ state = {} } = {}) => {
  debug('watchdog triggered, closing connection')

  const { ws } = state
  ws.close()
  return null
}

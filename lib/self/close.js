'use strict'

const debug = require('debug')('bfx:api:plugins:wd:self:close')

/**
 * Closes the target socket.
 *
 * @private
 *
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onSelfCloseGen = () => ({ state = {} } = {}) => {
  debug('watchdog triggered, closing connection')

  const { ws } = state
  ws.close()
  return null
}

module.exports = onSelfCloseGen

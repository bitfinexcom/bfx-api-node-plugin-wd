'use strict'

const debug = require('debug')('bfx:api:plugins:wd:self:close')

/**
 * Closes the target socket.
 *
 * @memberof module:bfx-api-node-plugin-wd
 * @private
 *
 * @returns {module:bfx-api-node-core.PluginEventHandler} func
 */
const onSelfCloseGen = () => ({ state = {} } = {}) => {
  debug('watchdog triggered, closing connection')

  const { ws } = state
  ws.close()
  return null
}

module.exports = onSelfCloseGen

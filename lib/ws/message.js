'use strict'

const _isFinite = require('lodash/isFinite')

/**
 * Resets the packet watchdog.
 *
 * @private
 *
 * @param {bfx-api-node-core.PluginHelpers} h - helpers
 * @param {object} args - plugin arguments
 * @returns {bfx-api-node-core.PluginEventHandler} func
 */
const onWSMessageGen = (h = {}, args = {}) => ({ state = {} } = {}) => {
  const { getState, emit } = h
  const { packetWDDelay } = args
  const { ev } = state
  const pState = getState(state)
  const { wdTimeout } = pState

  if (!_isFinite(packetWDDelay) || packetWDDelay <= 0) {
    return null
  }

  if (wdTimeout !== null) {
    clearTimeout(wdTimeout)
  }

  const newWDTimeout = setTimeout(
    emit.bind(null, ev, 'close'),
    packetWDDelay
  )

  return [null, {
    wdTimeout: newWDTimeout,
    lastPacketMTS: Date.now()
  }]
}

module.exports = onWSMessageGen

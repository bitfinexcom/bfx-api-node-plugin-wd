'use strict'

const _isFinite = require('lodash/isFinite')

module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
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
    lastPacketMTS: Date.now(),
  }]
}

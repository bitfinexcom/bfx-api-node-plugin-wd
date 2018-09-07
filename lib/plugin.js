'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onSelfClose = require('./self/close')
const onSelfReconnect = require('./self/reconnect')
const onWSMessage = require('./ws/message')
const onWSClose = require('./ws/close')
const onWSOpen = require('./ws/open')

/**
 * Implements auto-reconnect along with a packet watchdog that cycles the
 * connection after a configurable period of silence from the last packet.
 *
 * @param {boolean} autoReconnect - if false, the plugin is inactive
 * @param {number?} reconnectDelay - delay before reconnecting, default 1s
 * @param {number?} packetWDDelay - watchdog timeout, default 6s
 */
module.exports = definePlugin('bfx.wd', {
  autoReconnect: true,
  reconnectDelay: 1000,
  packetWDDelay: 6000
}, (h = {}, args = {}) => ({
  type: 'ws2',
  initialState: {
    lastPacketMTS: 0,
    isReconnecting: false,
    wdTimeout: null
  },

  self: {
    close: onSelfClose(h, args),
    reconnect: onSelfReconnect(h, args)
  },

  ws: {
    open: onWSOpen(h, args),
    message: onWSMessage(h, args),
    close: onWSClose(h, args)
  }
}))

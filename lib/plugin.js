'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onManagerWSDestroyed = require('./manager/ws_destroyed')
const onSelfReconnect = require('./self/reconnect')
const onSelfClose = require('./self/close')
const onWSMessage = require('./ws/message')
const onWSClose = require('./ws/close')
const onWSOpen = require('./ws/open')

/**
 * Implements auto-reconnect along with a packet watchdog that cycles the
 * connection after a configurable period of silence from the last packet.
 *
 * @function
 * @exports module:bfx-api-node-plugin-wd
 *
 * @param {boolean} [autoReconnect=true] - if false, the plugin is inactive
 * @param {number} [reconnectDelay=1000] - delay before reconnecting in ms
 * @param {number} [packetWDDelay=6000] - watchdog timeout in ms
 * @returns {module:bfx-api-node-core.Plugin} pluginState
 */
const Plugin = definePlugin('bfx.wd', {
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

  manager: {
    'ws:destroyed': onManagerWSDestroyed(h, args)
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

module.exports = Plugin

'use strict'

const { definePlugin } = require('bfx-api-node-core')
const onManagerWSDestroyed = require('./manager/ws_destroyed')
const onSelfReconnect = require('./self/reconnect')
const onSelfClose = require('./self/close')
const onWSMessage = require('./ws/message')
const onWSClose = require('./ws/close')
const onWSOpen = require('./ws/open')

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

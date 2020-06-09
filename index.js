'use strict'

/**
 * This plugin implements a watch-dog for {@link external:bfx-api-node-core}.
 * It can be initialized with a reconnection & watch dog delay, and will close
 * the socket connection & automatically reconnect if no message arrives within
 * the WD delay. It is meant to be used to detect and cycle stale socket
 * connections.
 *
 * @license MIT
 * @module bfx-api-node-plugin-wd
 * @function
 * @param {boolean} [autoReconnect=true] - if false, the plugin is inactive
 * @param {number} [reconnectDelay=1000] - delay before reconnecting in ms
 * @param {number} [packetWDDelay=6000] - watchdog timeout in ms
 * @returns {bfx-api-node-core.Plugin} pluginState
 * @example
 * const debug = require('debug')('bfx:api:plugins:wd:example')
 * const { Manager, subscribe } = require('bfx-api-node-core')
 * const WDPlugin = require('bfx-api-node-plugin-wd')
 *
 * const mgr = new Manager({
 *   transform: true,
 *
 *   // include watch-dog plugin on manager init
 *   plugins: [WDPlugin({
 *     autoReconnect: true,  // if false, the connection will only be closed
 *     reconnectDelay: 5000, // wait 5 seconds before reconnecting
 *     packetWDDelay: 10000  // set the watch-dog to a 10s delay
 *   })]
 * })
 *
 * // Note that we do nothing here; the watch-dog will fire due to a lack of
 * // incoming messages
 * mgr.onWS('open', {}, (state = {}) => {
 *   debug('open')
 * })
 *
 * mgr.openWS()
 */

/**
 * @external bfx-api-node-core
 * @see https://github.com/bitfinexcom/bfx-api-node-core
 */

module.exports = require('./lib/plugin')

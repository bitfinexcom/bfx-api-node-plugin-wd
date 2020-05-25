'use strict'

/**
 * This plugin implements a watch-dog for
 * {@link module:bfx-api-node-core|bfx-api-node-core}. It can be initialized
 * with a reconnection & watch dog delay, and will close the socket connection
 * & automatically reconnect if no message arrives within the WD delay. It is
 * meant to be used to detect and cycle stale socket connections.

 * ### Features

 * * Closes & re-opens connections if no packet arrives within the configured WD window

 * ### Installation

 * ```bash
 * npm i --save bfx-api-node-plugin-wd
 * ```

 * ### Quickstart & Example
 *
 * ```js
 * const debug = require('debug')('bfx:api:plugins:wd:example')
 * const { Manager, subscribe } = require('bfx-api-node-core')
 * const WDPlugin = require('bfx-api-node-plugin-wd')

 * const mgr = new Manager({
 *   transform: true,

 *   // include watch-dog plugin on manager init
 *   plugins: [WDPlugin({
 *     autoReconnect: true,  // if false, the connection will only be closed
 *     reconnectDelay: 5000, // wait 5 seconds before reconnecting
 *     packetWDDelay: 10000  // set the watch-dog to a 10s delay
 *   })]
 * })

 * // Note that we do nothing here; the watch-dog will fire due to a lack of
 * // incoming messages
 * mgr.onWS('open', {}, (state = {}) => {
 *   debug('open')
 * })

 * mgr.openWS()
 * ```
 *
 * @license MIT
 * @module bfx-api-node-plugin-wd
 */

module.exports = require('./lib/plugin')

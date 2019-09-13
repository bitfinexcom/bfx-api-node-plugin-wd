/* eslint-env mocha */
'use strict'

const assert = require('assert')
const WDPlugin = require('../lib/plugin')

describe('watchdog plugin', () => {
  it('initializes', () => {
    const plugin = WDPlugin()
    const { initialState } = plugin

    assert.strictEqual(plugin.type, 'ws2')
    assert.strictEqual(initialState.isReconnecting, false)
    assert.strictEqual(initialState.wdTimeout, null)
  })

  it('triggers a reconnect event if no message is received within the specified wd interval', (done) => {
    const plugin = WDPlugin({
      reconnectDelay: 10,
      packetWDDelay: 10
    })

    // Trigger first message event; WD will fire after, emitting a close event
    const messageUpdate = plugin.ws.message({
      state: {
        plugins: { // plugin state
          'bfx.wd': {}
        },

        ev: {
          emit: (eventName, id, label, args) => {
            assert.strictEqual(eventName, 'plugin:event')
            assert.strictEqual(id, 'bfx.wd')
            assert.strictEqual(label, 'close')
            done()
          }
        }
      }
    })

    const [, stateMessageUpdate] = messageUpdate

    assert(stateMessageUpdate.wdTimeout)
    assert(stateMessageUpdate.lastPacketMTS > 0)
  })
})

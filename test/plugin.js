/* eslint-env mocha */
'use strict'

const assert = require('assert')
const WDPlugin = require('../lib/plugin')

describe('watchdog plugin', () => {
  it('initializes', () => {
    const plugin = WDPlugin()
    const { initialState } = plugin

    assert.equal(plugin.type, 'ws2')
    assert.equal(initialState.isOpen, false)
    assert.equal(initialState.isClosing, false)
    assert.equal(initialState.isReconnecting, false)
    assert.equal(initialState.isAuthenticated, false)
    assert.equal(initialState.wasAuthenticated, false)
    assert.equal(initialState.wdTimeout, null)
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
            assert.equal(eventName, 'plugin:event')
            assert.equal(id, 'bfx.wd')
            assert.equal(label, 'close')
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

/* eslint-env mocha */
'use strict'

const assert = require('assert')
const onWSClose = require('ws/close')

describe('ws:close', () => {
  it('does nothing if autoReconnect is not enabled', () => {
    const handler = onWSClose({}, {
      autoReconnect: false
    })

    const res = handler()
    assert.equal(res, null)
  })

  it('emits reconnect event on a timeout if autoReconnect is enabled', (done) => {
    const handler = onWSClose({
      emit: (ev, eventName) => {
        assert.equal(ev, 42)
        assert.equal(eventName, 'reconnect')
        done()
      }
    }, {
      autoReconnect: true,
      reconnectDelay: 10
    })

    const res = handler({
      state: {
        ev: 42
      }
    })

    const [, stateUpdate] = res
    assert.equal(stateUpdate.isReconnecting, true)
  })
})

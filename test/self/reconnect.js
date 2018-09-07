/* eslint-env mocha */
'use strict'

const assert = require('assert')
const WebSocket = require('ws')
const onSelfReconnect = require('self/reconnect')

describe('self:reconnect', () => {
  it('clears timeout and reconnects if socket is closed', (done) => {
    const wdTimeout = setTimeout(() => {
      done(new Error('wd timeout should have been cleared'))
    }, 10)

    const handler = onSelfReconnect({
      getState: () => ({ wdTimeout })
    }, {
      reconnectDelay: 10
    })

    const res = handler({
      state: {
        ws: {
          readyState: WebSocket.CLOSED
        }
      }
    })

    const [, stateUpdate] = res
    assert.equal(stateUpdate.wdTimeout, null)
    assert.equal(stateUpdate.isReconnecting, false)

    setTimeout(() => {
      done()
    }, 20)
  })

  it('emits the reconnect event on a timeout if the socket is closing', (done) => {
    const handler = onSelfReconnect({
      getState: () => ({}),
      emit: (ev, eventName) => {
        assert.equal(ev, 42)
        assert.equal(eventName, 'reconnect')
        done()
      }
    }, {
      reconnectDelay: 10
    })

    const res = handler({
      state: {
        ev: 42,
        ws: {
          readyState: WebSocket.CLOSING
        }
      }
    })

    assert.equal(res, null)
  })

  it('clears reconnecting flag if socket is not closed or closing', () => {
    const handler = onSelfReconnect({
      getState: () => ({})
    }, {
      reconnectDelay: 10
    })

    const res = handler({
      state: {
        ev: null,
        ws: {
          readyState: WebSocket.OPEN
        }
      }
    })

    const [, stateUpdate] = res
    assert.equal(stateUpdate.isReconnecting, false)
  })
})

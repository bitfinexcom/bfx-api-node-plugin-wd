/* eslint-env mocha */
'use strict'

const WebSocket = require('ws')
const assert = require('assert')
const _isArray = require('lodash/isArray')
const _isObject = require('lodash/isObject')
const { EventEmitter } = require('events')

const onSelfReconnect = require('../../lib/self/reconnect')

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

    const ev = new EventEmitter()
    const res = handler({
      state: {
        ev,
        ws: {
          readyState: WebSocket.CLOSED
        }
      }
    })

    const [wsState, stateUpdate] = res
    assert.ok(_isObject(wsState))
    assert.strictEqual(stateUpdate.wdTimeout, null)
    assert.strictEqual(stateUpdate.isReconnecting, false)

    setTimeout(() => {
      wsState.ws.close()
      done()
    }, 20)
  })

  it('emits the reconnect event on a timeout if the socket is closing', (done) => {
    const handler = onSelfReconnect({
      getState: () => ({}),
      emit: (ev, eventName) => {
        assert.strictEqual(ev, 42)
        assert.strictEqual(eventName, 'reconnect')
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

    assert.ok(_isArray(res))
    assert.strictEqual(res[0], null)
    assert.ok(_isObject(res[1]))
    assert.ok(res[1].reconnectTimeout)
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
    assert.strictEqual(stateUpdate.isReconnecting, false)
  })
})

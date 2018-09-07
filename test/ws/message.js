/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isFinite = require('lodash/isFinite')
const onWSMessage = require('ws/message')

describe('ws:message', () => {
  it('does nothing if an invalid packet wd delay is specified', () => {
    const handler = onWSMessage({
      getState: () => ({})
    }, {
      packetWDDelay: null
    })

    const res = handler()
    assert.equal(res, null)
  })

  it('updates the wd timeout on new messages if wd delay specified', (done) => {
    const wdTimeout = setTimeout(() => {
      done(new Error('old timeout should not have fired'))
    }, 10)

    const handler = onWSMessage({
      getState: () => ({ wdTimeout }),
      emit: (ev, eventName) => {
        assert.equal(ev, 42)
        assert.equal(eventName, 'close')
        done()
      }
    }, {
      packetWDDelay: 20
    })

    const res = handler({
      state: {
        ev: 42
      }
    })

    const [, stateUpdate] = res
    assert(stateUpdate.wdTimeout !== wdTimeout)
    assert(_isFinite(stateUpdate.lastPacketMTS))
  })
})

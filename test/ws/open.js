/* eslint-env mocha */
'use strict'

const assert = require('assert')
const onWSOpen = require('../../lib/ws/open')

describe('ws:open', () => {
  it('sets managed close flag', () => {
    const handler = onWSOpen()
    const res = handler()

    assert.strictEqual(res.managedClose, true)
  })
})

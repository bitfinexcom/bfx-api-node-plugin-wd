/* eslint-env mocha */
'use strict'

const onSelfClose = require('../../lib/self/close')

describe('self:close', () => {
  const handler = onSelfClose()

  it('closes the socket', (done) => {
    handler({
      state: {
        ws: {
          close: done
        }
      }
    })
  })
})

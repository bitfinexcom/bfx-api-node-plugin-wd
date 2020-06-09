/* eslint-env mocha */
'use strict'

const onSelfClose = require('../../lib/self/close')

describe('self:close', () => {
  const handler = onSelfClose()

  it('closes the socket', (done) => { // eslint-disable-line
    handler({
      state: {
        ws: {
          close: done
        }
      }
    })
  })
})

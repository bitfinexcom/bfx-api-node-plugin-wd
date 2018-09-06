'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:api:plugins:wd:example')
const { Manager, subscribe } = require('bfx-api-node-core')
const WDPlugin = require('../')

const mgr = new Manager({
  transform: true,
  plugins: [WDPlugin()]
})

mgr.onWS('open', {}, (state = {}) => {
  debug('open')
})

mgr.openWS()

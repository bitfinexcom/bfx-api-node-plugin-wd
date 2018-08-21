'use strict'

const debug = require('debug')('bfx:api:plugins:wd:ws:open')

module.exports = (h = {}, args = {}) => ({ state = {} } = {}) => {
  debug('setting managed close flag')

  return {
    ...state,
    managedClose: true,
  }
}

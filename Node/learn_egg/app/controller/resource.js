const BaseController = require('./base')
class Controller extends BaseController {
  constructor(...args) {
    super(...args)
    this.entity = 'resource'
  }
}
module.exports = Controller

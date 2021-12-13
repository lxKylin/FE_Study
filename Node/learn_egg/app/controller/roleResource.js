const BaseController = require('./base')
class Controller extends BaseController {
  constructor(...args) {
    super(...args)
    this.entity = 'roleResource'
  }
}
module.exports = Controller

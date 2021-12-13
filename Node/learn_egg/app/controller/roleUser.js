const BaseController = require('./base')
class Controller extends BaseController {
  constructor(...args) {
    super(...args)
    this.entity = 'roleUser'
  }
}
module.exports = Controller

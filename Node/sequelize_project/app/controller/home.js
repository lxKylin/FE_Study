'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.model.Users);
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;

'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Size = use('App/Models/Size')

/**
 * Resourceful controller for interacting with pizza sizes
 */
class FlavorController {
  /**
   * Show a list of all pizza sizes.
   * GET api/sizes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page } = request.get()

    let sizes = await Size.query().paginate(page)

    return sizes
  }
}

module.exports = FlavorController

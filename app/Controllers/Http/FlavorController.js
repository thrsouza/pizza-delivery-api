'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Flavor = use('App/Models/Flavor')

/**
 * Resourceful controller for interacting with pizza flavors
 */
class FlavorController {
  /**
   * Show a list of all pizza flavors.
   * GET api/flavors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page } = request.get()

    let flavors = await Flavor.query().paginate(page)

    return flavors
  }
}

module.exports = FlavorController

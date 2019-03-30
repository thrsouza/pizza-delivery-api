'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Personalization = use('App/Models/Personalization')

/**
 * Resourceful controller for interacting with personalizations
 */
class PersonalizationController {
  /**
   * Show a list of all personalizations.
   * GET personalizations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { page } = request.get()

    let personalizations = await Personalization.query().paginate(page)

    return personalizations
  }
}

module.exports = PersonalizationController

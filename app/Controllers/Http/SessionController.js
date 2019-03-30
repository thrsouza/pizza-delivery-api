'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class SessionController {
  /**
   * Create/save a new token.
   * POST token
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController

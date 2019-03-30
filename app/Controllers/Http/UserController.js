'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async update ({ params, request, response, auth }) {
    const data = request.only(['name', 'password', 'new_password'])

    const sessionUser = await auth.getUser()

    if (Number(params.id) !== sessionUser.id) {
      return response.status(401).send()
    }

    const user = await User.findOrFail(params.id)

    const isValidPassword = await Hash.verify(data.password, user.password)

    if (!isValidPassword) {
      return response.status(401).send()
    }

    user.name = data.name
    user.password = data.new_password

    user.save()
  }
}

module.exports = UserController

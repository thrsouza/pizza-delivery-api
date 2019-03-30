'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const OrderPersonalization = use('App/Models/OrderPersonalization')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Size = use('App/Models/Size')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Flavor = use('App/Models/Flavor')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Personalization = use('App/Models/Personalization')

const Database = use('Database')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async index ({ request, auth }) {
    const { page } = request.get()
    const sessionUser = await auth.getUser()

    const orders = await Order.query()
      .where({ user_id: sessionUser.id })
      .orderBy('created_at', 'desc')
      .paginate(page)

    return orders
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async store ({ request, response, auth }) {
    const data = request.only(['size_id', 'flavor_id', 'personalizations'])
    const sessionUser = await auth.getUser()

    const size = await Size.findOrFail(data.size_id)
    const flavor = await Flavor.findOrFail(data.flavor_id)

    let total_value = size.value
    let total_minutes = size.minutes + flavor.additional_minutes

    const personalizations = []

    if (data.personalizations) {
      if (!Array.isArray(data.personalizations)) {
        return response.status(500).send()
      }

      for (var i = 0; i < data.personalizations.length; i++) {
        const id = data.personalizations[i]
        const personalization = await Personalization.findOrFail(id)

        personalizations.push({
          description: personalization.description,
          value: personalization.additional_value
        })
        total_value += personalization.additional_value
        total_minutes += personalization.additional_minutes
      }
    }

    const transaction = await Database.beginTransaction()

    const order = await Order.create(
      {
        user_id: sessionUser.id,
        size_description: size.description,
        flavor_description: flavor.description,
        value: size.value,
        total_value,
        total_minutes
      },
      transaction
    )

    for (let i = 0; i < personalizations.length; i++) {
      var personalization = personalizations[i]

      await OrderPersonalization.create(
        {
          order_id: order.id,
          ...personalization
        },
        transaction
      )
    }

    transaction.commit()

    return response.status(201).json({ order_id: order.id })
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {AuthSession} ctx.auth
   */
  async show ({ params, response, auth }) {
    const sessionUser = await auth.getUser()

    const order = await Order.findOrFail(params.id)

    if (order.user_id !== sessionUser.id) {
      return response.status(401).send()
    }

    await order.load('user')
    await order.load('order_personalizations')

    return order
  }
}

module.exports = OrderController

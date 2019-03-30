'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  order_personalizations () {
    return this.hasMany('App/Models/OrderPersonalization')
  }
}

module.exports = Order

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderPersonalizationSchema extends Schema {
  up () {
    this.create('order_personalizations', table => {
      table.increments()
      table
        .integer('order_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description').notNullable()
      table.float('value', 18, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_personalizations')
  }
}

module.exports = OrderPersonalizationSchema

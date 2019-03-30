'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PizzaSizeSchema extends Schema {
  up () {
    this.create('sizes', table => {
      table.increments()
      table.string('description', 32).notNullable()
      table.integer('preparation_minutes').notNullable()
      table.decimal('value', 18, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sizes')
  }
}

module.exports = PizzaSizeSchema

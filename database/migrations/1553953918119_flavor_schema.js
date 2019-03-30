'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FlavorSchema extends Schema {
  up () {
    this.create('flavors', table => {
      table.increments()
      table.string('description', 32).notNullable()
      table.integer('additional_minutes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('flavors')
  }
}

module.exports = FlavorSchema

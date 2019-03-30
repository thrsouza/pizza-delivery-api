'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonalizationSchema extends Schema {
  up () {
    this.create('personalizations', table => {
      table.increments()
      table.string('description', 32).notNullable()
      table.float('additional_value', 18, 2).notNullable()
      table.integer('additional_minutes').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('personalizations')
  }
}

module.exports = PersonalizationSchema

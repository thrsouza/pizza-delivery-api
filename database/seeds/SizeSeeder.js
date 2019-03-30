'use strict'

/*
|--------------------------------------------------------------------------
| PizzaSizeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Size = use('App/Models/Size')

class SizeSeeder {
  async run () {
    await Size.createMany([
      {
        description: 'pequena',
        value: 20.0,
        minutes: 15
      },
      {
        description: 'média',
        value: 30.0,
        minutes: 20
      },
      {
        description: 'grande',
        value: 40.0,
        minutes: 25
      }
    ])
  }
}

module.exports = SizeSeeder

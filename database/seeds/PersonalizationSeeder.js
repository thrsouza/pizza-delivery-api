'use strict'

/*
|--------------------------------------------------------------------------
| PersonalizationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Personalization = use('App/Models/Personalization')

class PersonalizationSeeder {
  async run () {
    await Personalization.createMany([
      {
        description: 'extra bacon',
        additional_value: 3.0,
        additional_minutes: 0
      },
      {
        description: 'sem cebola',
        additional_value: 0,
        additional_minutes: 0
      },
      {
        description: 'borda recheada',
        additional_value: 5.0,
        additional_minutes: 5
      }
    ])
  }
}

module.exports = PersonalizationSeeder

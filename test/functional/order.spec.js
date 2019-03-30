'use strict'

const { test, trait } = use('Test/Suite')('Pizza Order')
const Factory = use('Factory')

const Size = use('App/Models/Size')
const Flavor = use('App/Models/Flavor')
const Personalization = use('App/Models/Personalization')

trait('Test/ApiClient')
trait('Auth/Client')

test('should be return orders', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const sessionResponse = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '123123'
    })
    .end()

  const response = await client
    .get('/api/orders')
    .header('Authorization', `Bearer ${sessionResponse.body.token}`)
    .end()

  response.assertStatus(200)
})

test('should be create order with pizza personalizations', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const sessionResponse = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '123123'
    })
    .end()

  const { id: size_id } = await Size.query().first()
  const { id: flavor_id } = await Flavor.query().first()
  const { id: personalization_id } = await Personalization.query().first()

  const response = await client
    .post('/api/orders')
    .header('Authorization', `Bearer ${sessionResponse.body.token}`)
    .send({
      size_id,
      flavor_id,
      personalizations: [personalization_id]
    })
    .end()

  response.assertStatus(201)
})

test('should be create order without pizza personalizations', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const sessionResponse = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '123123'
    })
    .end()

  const { id: size_id } = await Size.query().first()
  const { id: flavor_id } = await Flavor.query().first()

  const response = await client
    .post('/api/orders')
    .header('Authorization', `Bearer ${sessionResponse.body.token}`)
    .send({
      size_id,
      flavor_id
    })
    .end()

  response.assertStatus(201)
})

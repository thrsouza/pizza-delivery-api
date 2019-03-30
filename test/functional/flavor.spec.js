'use strict'

const { test, trait } = use('Test/Suite')('Pizza Flavor')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('should be available flavor options', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()

  const sessionResponse = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '123123'
    })
    .end()

  const response = await client
    .get('/api/flavors')
    .header('Authorization', `Bearer ${sessionResponse.body.token}`)
    .end()

  response.assertStatus(200)
  assert.isTrue(response.body.data.length > 0)
})

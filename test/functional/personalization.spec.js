'use strict'

const { test, trait } = use('Test/Suite')('Pizza Personalization')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('should be available personalization options', async ({
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

  const response = await client
    .get('/api/personalizations')
    .header('Authorization', `Bearer ${sessionResponse.body.token}`)
    .end()

  response.assertStatus(200)
  assert.isTrue(response.body.data.length > 0)
})

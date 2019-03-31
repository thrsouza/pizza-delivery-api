'use strict'

const { test, trait } = use('Test/Suite')('User Session')
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')

test('should be able to authenticate with valid credentials', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '123123'
    })
    .end()

  response.assertStatus(200)
  assert.isTrue(!!response.body.token)
})

test('should not be able to authenticate with invalid credentials', async ({
  assert,
  client
}) => {
  const user = await Factory.model('App/Models/User').create()

  const response = await client
    .post('/api/sessions')
    .send({
      email: user.email,
      password: '333333'
    })
    .end()

  response.assertStatus(401)
  assert.isFalse(!!response.body.token)
})

test('should be able to access private routes when authenticated', async ({
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

  const endpoints = [
    '/api/orders',
    '/api/flavors',
    '/api/personalizations',
    '/api/sizes'
  ]

  for (let i = 0; i < endpoints.length; i++) {
    const response = await client
      .get(endpoints[i])
      .header('Authorization', `Bearer ${sessionResponse.body.token}`)
      .end()

    response.assertStatus(200)
  }
})

test('should not be able to access private routes when not authenticated', async ({
  client
}) => {
  const endpoints = [
    '/api/orders',
    '/api/flavors',
    '/api/personalizations',
    '/api/sizes'
  ]

  for (let i = 0; i < endpoints.length; i++) {
    const response = await client.get(endpoints[i]).end()
    response.assertStatus(401)
  }
})

# Pizza Delivery API - UDS Challenge

1. Bodyparser
2. Authentication
3. Lucid ORM
4. Migrations and seeds
5. Functional tests

<br/>

## Install dependencies

```shell
$ yarn || npm install
```

<br/>

## Migrations

Run the following command to run startup migrations and seeders.

```shell
$ yarn db:configure || npm run db:configure
```

<br/>

## Test Application

To start the application tests:

```shell
$ yarn start:test || npm run start:test
```

Latest result:

```shell
➜ yarn start:test
yarn run v1.15.2
$ node ace test
info: serving app on http://127.0.0.1:3333
Database migrated successfully in 304 ms
Seeded database in 170 ms

  Pizza Flavor
    ✓ should be available flavor options (297ms)

  Pizza Order
    ✓ should be return orders (174ms)
    ✓ should be create order with pizza personalizations (187ms)
    ✓ should be create order without pizza personalizations (204ms)

  Pizza Personalization
    ✓ should be available personalization options (231ms)

  User Session
    ✓ shold be able to authenticate with valid credentials (212ms)
    ✓ shold not be able to authenticate with invalid credentials (223ms)
    ✓ should be able to access private routes when authenticated (229ms)
    ✓ should not be able to access private routes when not authenticated (9ms)

  Pizza Size
    ✓ should be available size options (221ms)

   PASSED

  total       : 10
  passed      : 10
  time        : 2s
Reset completed in 225 ms
Done in 3.49s.
```

<br/>

## Start Application

To start application in development environment:

```shell
$ yarn start:dev || npm run start:dev
```

To start application in production environment:

```shell
$ yarn start || npm run start
```

<br/>

## Route List

DEMO: https://thiagodesouza-delivery-api.herokuapp.com

| Route                 | Verb(s)   | Handler                         | Middleware         | Name                   |
| --------------------- | --------- | ------------------------------- | ------------------ | ---------------------- |
| /api/users            | POST      | UserController.store            | av:StoreUser       | users.store            |
| /api/users/:id        | PUT,PATCH | UserController.update           | auth,av:UpdateUser | users.update           |
| /api/sessions         | POST      | SessionController.store         | av:StoreSession    | sessions.store         |
| /api/sizes            | HEAD,GET  | SizeController.index            | auth               | sizes.index            |
| /api/flavors          | HEAD,GET  | FlavorController.index          | auth               | flavors.index          |
| /api/personalizations | HEAD,GET  | PersonalizationController.index | auth               | personalizations.index |
| /api/orders           | HEAD,GET  | OrderController.index           | auth               | orders.index           |
| /api/orders           | POST      | OrderController.store           | auth,av:StoreOrder | orders.store           |
| /api/orders/:id       | HEAD,GET  | OrderController.show            | auth               | orders.show            |

<br />

### Examples

#### Store User

```json
// POST: /api/users

{
  "name": "Thiago de Souza",
  "email": "thiago@email.com.br",
  "password": "udschallenge",
  "password_confirmation": "udschallenge"
}

// DEMO: https://thiagodesouza-delivery-api.herokuapp.com/api/users
```

#### Store Session

```json
// POST: /api/sessions

{
  "email": "thiago@email.com.br",
  "password": "udschallenge"
}

// DEMO: https://thiagodesouza-delivery-api.herokuapp.com/api/sessions
```

#### Store Order

```json
// HEADER: Authorization - Bearer <user-token>
// POST: /api/orders

{
  "size_id": 3,
  "flavor_id": 3,
  "personalizations": [1, 2, 3]
}

// DEMO: https://thiagodesouza-delivery-api.herokuapp.com/api/orders
```

<br />

Best regards,

**Thiago Rodrigues de Souza** \
**e-mail:** email@thiagodesouza.com.br \
**site:** [https://www.thiagodesouza.com.br](https://www.thiagodesouza.com.br)

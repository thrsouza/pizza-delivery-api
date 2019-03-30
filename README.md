# Pizza Delivery API - UDS Challenge

1. Bodyparser
2. Authentication
3. Lucid ORM
4. Migrations and seeds
5. Functional tests

### Install dependencies

```shell
$ yarn || npm install
```

### Migrations

Run the following command to run startup migrations and seeders.

```shell
$ yarn db:configure || npm run db:configure
```

### Test Application

To start the application tests:

```shell
$ yarn start:test || npm run start:test
```

### Start Application

To start application in development environment:

```shell
$ yarn start:dev || npm run start:dev
```

To start application in production environment:

```shell
$ yarn start || npm run start
```

### Route List

| Route                 | Verb(s)   | Handler                         | Middleware         | Name                   |
| --------------------- | --------- | ------------------------------- | ------------------ | ---------------------- |
| /api/sessions         | POST      | SessionController.store         | av:StoreSession    | sessions.store         |
| /api/users            | POST      | UserController.store            | av:StoreUser       | users.store            |
| /api/users/:id        | PUT,PATCH | UserController.update           | auth,av:UpdateUser | users.update           |
| /api/sizes            | HEAD,GET  | SizeController.index            | auth               | sizes.index            |
| /api/flavors          | HEAD,GET  | FlavorController.index          | auth               | flavors.index          |
| /api/personalizations | HEAD,GET  | PersonalizationController.index | auth               | personalizations.index |
| /api/orders           | HEAD,GET  | OrderController.index           | auth               | orders.index           |
| /api/orders           | POST      | OrderController.store           | auth,av:StoreOrder | orders.store           |
| /api/orders/:id       | HEAD,GET  | OrderController.show            | auth               | orders.show            |

<br />

Best regards,

**Thiago Rodrigues de Souza** \
**e-mail:** email@thiagodesouza.com.br \
**site:** [https://www.thiagodesouza.com.br](https://www.thiagodesouza.com.br)

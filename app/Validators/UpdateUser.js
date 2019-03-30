'use strict'

const Antl = use('Antl')

class StoreUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      password: 'required',
      new_password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = StoreUser

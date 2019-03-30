'use strict'

const Antl = use('Antl')

class StoreOrder {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      size_id: 'required',
      flavor_id: 'required',
      personalizations: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = StoreOrder

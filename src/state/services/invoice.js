import moment from 'moment'
import consoleLog from '@utils/console-log'
import { addContact } from '@state/services/contact'
import axios from './axiosConfig'

export const findInvoice = (sellerId) => {
  try {
    return axios.get('bills', {
      client_id: sellerId,
      order_direction: 'DESC',
      order_field: 'date'
    }).then((response) => response.data[0])
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}

export const addInvoice = async (seller, amount) => {
  try {
    const contact = await addContact(seller.name)

    if (contact.id) {
      const today = moment(Date.now()).format('YYYY-MM-DD')

      return axios.post('bills', {
        date: today,
        dueDate: today,
        provider: contact.id,
        purchases: {
          categories: [
            {
              id: '5093',
              price: 1,
              quantity: amount,
              observations: 'Pago de Concurso'
            }
          ]
        }
      }).then((response) => response.data)
    }
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}

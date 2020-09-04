import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 3,
        name: 'HARRY WHITE',
        email: 'harry@gmail.com',
        phone: '555-666-7777',
        type: 'professional',
      },
      {
        id: 2,
        name: 'Susan WHITE',
        email: 'susan@gmail.com',
        phone: '111-666-7777',
        type: 'personal',
      },
      {
        id: 1,
        name: 'Debbie WHITE',
        email: 'debbie@gmail.com',
        phone: '222-666-7777',
        type: 'professional',
      },
    ],
  };

const [state, dispatch] = useReducer(contactReducer, initialState)


  // Add contact
  const addContact = contact => {
    contact.id = uuidv4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Update Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );

}


export default ContactState
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
        name: 'HARRY WHITE-TIGHTY',
        email: 'harry@gmail.com',
        phone: '555-666-7777',
        type: 'professional',
      },
      {
        id: 2,
        name: 'Susan WHITE VII',
        email: 'susan@gmail.com',
        phone: '111-666-7777',
        type: 'personal',
      },
      {
        id: 1,
        name: 'Debbie WHITEY-McWhitenson',
        email: 'debbie@gmail.com',
        phone: '222-666-7777',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };

const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add contact
  const addContact = contact => {
    contact.id = uuidv4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
    
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // Clear Current Contact
  const clearCurrent = contact => {
    // no payload, we are just setting "current" back to "null"
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }
  // Clear Filter
  const clearFilter = () => {
    // no payload, we are just setting "filtered" back to "null"
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        clearCurrent,
        setCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );

}


export default ContactState
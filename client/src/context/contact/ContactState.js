import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types'

// default/starting state
const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

const [state, dispatch] = useReducer(contactReducer, initialState)

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')

      dispatch({ 
        type: GET_CONTACTS, 
        payload: res.data 
      })
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR, 
        payload: err.response.msg
      })
    }
  }


  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content_Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)

      dispatch({ 
        type: ADD_CONTACT, 
        payload: res.data 
      })
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR, 
        payload: err.response.msg 
      })
    }
  }

  // Update Contact
  const updateContact = async contact => {    
    
    const config = {
      headers: {
        'Content_Type': 'application/json'
      }
    }
 
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({ 
        type: UPDATE_CONTACT, 
        payload: res.data 
      })
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR, 
        payload: err.response.msg 
      })
    }
  }

  // Delete Contact
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`)
      dispatch({ 
        type: DELETE_CONTACT, 
        payload: id 
      })
    } catch (err) {
      dispatch({ 
        type: CONTACT_ERROR, 
        payload: err.response.msg 
      })
    }
  }

  // Clear Contacts
  const clearContacts = contact => {
    dispatch({ type: CLEAR_CONTACTS, payload: contact })
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
        error: state.error,
        clearContacts,
        getContacts,
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
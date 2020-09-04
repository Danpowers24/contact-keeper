import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

// This form will be used to add and update Contacts

const ContactForm = () => {
  
  const contactContext = useContext(ContactContext)
  
  const { addContact, clearCurrent, current, updateContact } = contactContext

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })

  const { name, email, phone, type } = contact

  // Listening for any changes in the inputs, variables for {name: value} of whichever is being changed
  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })
  
  // When form gets submitted,
  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addContact(contact)
    } else {
      updateContact(contact)
    }
    
    // reset the fields back to default state after submit
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
        
        <input type='text' 
          placeholder='Name' 
          name='name' 
          value={name} 
          onChange={onChange}>
        </input>
        
        <input type='email' 
          placeholder='johnDoe@gmail.com' 
          name='email' 
          value={email} 
          onChange={onChange}>
        </input>
        
        <input type='text' 
          placeholder='phone number' 
          name='phone' 
          value={phone} 
          onChange={onChange}>
        </input>
        
        <h5>Choose a type</h5>
        
        <input type='radio' 
          name='type' 
          value='personal' 
          checked={type === 'personal'}
          onChange={onChange}>
        </input>{' '}Personal{' '}
        
        <input type='radio' 
          name='type' 
          value='professional' 
          checked={type === 'professional'}
          onChange={onChange}>
        </input>{' '}Professional{' '}
      <div>
        <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'></input>
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}
    </form>
  )
}

export default ContactForm
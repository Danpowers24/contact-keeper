import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'


const Register = (props) => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      // once the user is authenticated, then we want to redirect to the home page, by pushing '/' to the last page in browser's history
      props.history.push('/')
    }

    // for larger applications, we should be sending the errors back with ID's and checking for those ID's here
    if (error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = user

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  // This is reduntant thanks to the "required" tags in each input in the return, but 
  // it's nice to have this logic as a backup
  const onSubmit = e => {
    // if you click submit and are missing a field, 
    if (name === '' || email === '' || password === '') {
      setAlert('All fields are required', 'danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else if (password.length < 6 || password2.length < 6) {
      setAlert('Passwords must be at least 6 characters long', 'danger')
    } else {
      register({
        name,
        email,
        password
      })
    }
    e.preventDefault()
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className="textprimary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required/> 
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required/> 
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required/> 
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='password' name='password2' value={password2} onChange={onChange} required/> 
        </div>
        <input type="submit" value="Register" className='btn btn-primary btn-block' />
      </form>
    </div>
  )
}

export default Register
import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        // run the loadUser function if user reloads the homepage, while successfully signed in
        // that way we will hit the backend on a reload and validate our token and stay authenticated
        authContext.loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home
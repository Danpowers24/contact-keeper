import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {
  const alertContext = useContext(AlertContext)

  return (
    // if the alerts array has anything in it (according to state)
    alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
      // we have to have variable key id and classes for this div because we don't know which alert we will get
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg }
      </div>
    ))
  )
}

export default Alerts
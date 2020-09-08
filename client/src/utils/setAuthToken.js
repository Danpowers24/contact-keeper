import axios from 'axios'

const setAuthToken = token => {
  // if a token exists from the signed in user, then set it to the correct one needed to make more requrests
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
    // once the user signs out, delete the token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken
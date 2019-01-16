import axios from 'axios'

const url = 'http://localhost:5000/api/auth'

class AuthService {
  static login (credentials) {
    return new Promise(async (resolve) => {
      try {
        const res = await axios.post(`${url}/login`, credentials)
        resolve(res)
      } catch (e) {
        resolve(e.response)
      }
    })
  }
}

export default AuthService
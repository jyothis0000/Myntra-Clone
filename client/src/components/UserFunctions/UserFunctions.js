import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:5000/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password
    }).then(response => {
        console.log('Registered')
      }).catch(err=>{
          console.log(err);     
        })
}

export const update = updateUser => {
  return axios
    .put('http://localhost:5000/users/update', {
      first_name: updateUser.first_name,
      last_name: updateUser.last_name,
      phone: updateUser.phone,
      email: updateUser.email,
      token:updateUser.token
    }).then(response => {
        localStorage.removeItem('usertoken')
        window.location='/login'
      }).catch(err=>{
          console.log(err);     
        })
}

export const login = user => {
  return axios
    .post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    }).then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      }).catch(err => {
          console.log(err)
          this.props.history.push('/login')
        })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:5000/users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    }).then(response => {
        console.log(response.data)
        return response.data
      }).catch(err => {
          console.log(err)
        })
}

export const filter = filter => {
  return axios
    .get('http://localhost:5000/allproduct/filter', {
    }).then(response => {
        console.log(response.data)
        return response.data
      }).catch(err => {
          console.log(err)
        })
}

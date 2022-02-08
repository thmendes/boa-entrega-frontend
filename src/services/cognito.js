import axios from "axios"
const baseUrl = ''
export const authenticate = (credentials) => {
  return axios.post(
    `${baseUrl}/dev/signin`,
    {
      'email': credentials.email,
      'password': credentials.password
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const signup = (user) => {
  return axios.post(
    `${baseUrl}/dev/signup`,
    {
      'email': user.username,
      'password': user.password,
      'name': user.name
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const checkUser = (email) => {
  return axios.post(
    `${baseUrl}/dev/check-user`,
    {
      'user': email,      
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const confirmSignup = (user) => {
  return axios.post(
    `${baseUrl}/dev/confirm-signup`,
    {
      'email': user.username,
      'code': user.code,
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const resendConfirmationCode = (user) => {
  return axios.post(
    `${baseUrl}/dev/resend-confirmation-code`,
    {
      'user': user,    
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const forgotPassword = (user) => {
  return axios.post(
    `${baseUrl}/dev/forgot-password`,
    {
      'username': user.username
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const confirmForgotPassword = (user) => {
  return axios.post(
    `${baseUrl}/dev/confirm-forgot-password`,
    {
      'username': user.username,
      'password': user.password,
      'confirmationCode': user.confirmationCode
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

export const changePassword = (previousPassword, proposedPassword, accessToken) => {
  return axios.post(
    `${baseUrl}/dev/change-password`,
    {
      previousPassword: previousPassword,
      proposedPassword: proposedPassword,
      accessToken: accessToken
    }
  )
  .then(res => Promise.resolve(res.data))
  .catch(err => Promise.reject(err))
}

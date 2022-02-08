import * as types from './mutations-types'
import * as cognitoService from '@/services/cognito'
import router from '../../../router'

export const logout = ({ commit }) => {
  commit(types.IS_AUTHENTICATED, false)
  commit(types.SET_TOKEN, '');
  router.push({name: 'Login'})
}

export const authenticate = ({ commit }) => {
   commit(types.IS_AUTHENTICATED, true);
   commit(types.SET_ADMIN, true);
   router.push({name: 'Entregas'});
//   return cognitoService.authenticate(credentials)
//    .then(res => {
//       commit(types.GET_USER, res);
//       commit(types.SET_TOKEN, res.AuthenticationResult.AccessToken);
//       commit(types.SET_USER_EMAIL, res.UserAttributes.find(att => att.Name == "email").Value);
//       commit(types.SET_ADMIN, !!res.Groups.find(group => group.GroupName == 'admin'));
//       return Promise.resolve(res)
//    })
//    .catch(err => {
//       commit(types.IS_AUTHENTICATED, false)
//       return Promise.reject(err)
//    })
}

export const checkEmail = (email) => {
  return cognitoService.checkUser(email)
   .then(res => {
      return Promise.resolve(res)
   })
   .catch(err => {
      return Promise.reject(err)
   })
}

export const resendConfirmationCode = (user) => {
  return cognitoService.resendConfirmationCode(user)
   .then(res => {
      return Promise.resolve(res)
   })
   .catch(err => {
      return Promise.reject(err)
   })
}

export const forgotPassword = (user) => {
  return cognitoService.forgotPassword(user)
   .then(res => {
      return Promise.resolve(res)
   })
   .catch(err => {
      return Promise.reject(err)
   })
}

export const confirmForgotPassword = (user) => {
  return cognitoService.confirmForgotPassword(user)
   .then(res => {
      return Promise.resolve(res)
   })
   .catch(err => {
      return Promise.reject(err)
   })
}

export const changePassword = (payload) => {
  return cognitoService.changePassword(payload.previousPassword, payload.proposedPassword, payload.accessToken)
   .then(res => {
      return Promise.resolve(res)
   })
   .catch(err => {
    return Promise.reject(err)
   })
}

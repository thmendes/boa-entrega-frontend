import store from '../store'

export const authGuard = (to, from, next) => {
  if (to.name !== 'Login' && !store.getters['cognito/isAuthenticated']){
    next({ name: 'Login' })
  }
  else next()
}

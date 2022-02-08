import cognito from './cognito'

const vuex = {
    cognito
}

const keys = Object.keys(vuex)
const modules = keys.reduce((acc, key) => ({ ...acc, [key]: vuex[key].module}), {})
export default {modules}

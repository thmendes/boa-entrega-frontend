<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            xl="4"
            lg="8"
            sm="8"
            md="8"
          >
            <v-card class="elevation-2">
              <v-toolbar color="#2171CC"  flat>
                <v-img
                  :src="require('../../assets/logo.png')"
                  class="my-3"
                  contain
                  height="50"
                ></v-img>
              </v-toolbar>
              <v-card-text class="pt-10">
                <v-form>
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    name="e-mail"
                    placeholder="Digite seu e-mail"
                    prepend-icon="mdi-account"
                    type="text"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    name="Senha"
                    prepend-icon="mdi-lock"
                    type="password"
                    outlined
                  ></v-text-field>
                </v-form>
                <p>Esqueceu sua senha? <v-btn @click="$router.push('/esqueci-minha-senha')" text>Clique para recuperá-la</v-btn> </p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#97C93C" @click="login" class="white--text" width="100%">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <Snackbar/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components:{
      Snackbar: () => import('@/components/utils/Snackbar')
    },
    data: () => ({
      userGroups: undefined,
      email: undefined,
      password: undefined,
      error: {
        code: '',
        name: '',
        message: ''
      }
    }),
    methods: {
      ...mapMutations([
        'setSnackbar'
      ]),
      ...mapActions({
        authenticate: 'cognito/authenticate',
      }),
      login () {
        this.authenticate({email: this.email, password: this.password})
        .then(() => {})
        .catch((err) => {
          let message = 'Não foi possível entrar na plataforma. Tente novamente mais tarde.'
          
          if(err.response.data.message != 'Erro interno.')
            message = err.response.data.message

          this.setSnackbar({
            type: 'error',
            msg: message
          })
        })
      }
    }
  }
</script>
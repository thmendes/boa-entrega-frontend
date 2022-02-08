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
            <v-card class="elevation-2" v-if="this.state == 1">
              <v-toolbar color="#00407A"  flat>
                <v-img
                  :src="require('../../assets/logo.png')"
                  class="my-3"
                  contain
                  height="70"
                ></v-img>
              </v-toolbar>
              <v-card-text class="pt-10" >
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
                </v-form>
                <p><v-btn @click="$router.push('/entrar')" text>Voltar para o login</v-btn> </p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#97C93C" @click="initiateForgotPassword" class="white--text" width="100%">Recuperar</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="elevation-2" v-if="this.state == 2">
              <v-toolbar color="#00407A"  flat>
                <v-img
                  :src="require('../../assets/logo.png')"
                  class="my-3"
                  contain
                  height="50"
                ></v-img>
              </v-toolbar>
              <v-card-text class="pt-10" >
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
                    id="code"
                    v-model="code"
                    label="Código de verificação"
                    placeholder="Digite o código de verificação"
                    name="Senha"
                    prepend-icon="mdi-lock"
                    type="text"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Nova senha"
                    placeholder="Digite sua senha"
                    name="Senha"
                    prepend-icon="mdi-lock"
                    type="password"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#97C93C" @click="confirmPassword" class="white--text" width="100%">Cadastrar nova senha</v-btn>
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
  import { mapActions, mapMutations } from 'vuex'

  export default {
    components:{
      Snackbar: () => import('@/components/utils/Snackbar')
    },
    data: () => ({
      userGroups: undefined,
      email: undefined,
      password: undefined,
      code: undefined,
      state: 2,
      error: {
        code: '',
        name: '',
        message: ''
      }
    }),
    methods: {
      ...mapActions({
        forgotPassword: 'cognito/forgotPassword',
        confirmForgotPassword: 'cognito/confirmForgotPassword'        
      }),
      ...mapMutations([
        'setSnackbar'
      ]),
      initiateForgotPassword(){
        this.forgotPassword({username: this.email})
        .then(() => {
          var message = 'Um código de confirmação foi enviado ao seu e-mail'
          this.state = 2;
          this.setSnackbar({
            type: 'success',
            msg: message
          });
        })
        .catch((error) => {
          var message = 'Falha ao tentar recuperar senha. Entre em contato com a administração.';

          if(error.response.data.message != 'Erro interno.')
            message = error.response.data.message;

          this.setSnackbar({
            type: 'error',
            msg: message
          });
        })
      },
      confirmPassword(){
        this.confirmForgotPassword({username: this.email, confirmationCode: this.code, password: this.password})
        .then(() => {
          var message = 'Senha atualizada com sucesso!'
          this.$router.push('/entrar'); 
          this.setSnackbar({
            type: 'success',
            msg: message
          });
        })
        .catch((error) => {
          var message = 'Falha ao confirmar código. Tente novamente mais tarde.';

          if(error.response.data.message != 'Erro interno.')
            message = error.response.data.message;

          this.setSnackbar({
            type: 'error',
            msg: message
          });
        })
      }
    }
  }
</script>
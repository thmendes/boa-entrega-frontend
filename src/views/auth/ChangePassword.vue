<template>
  <div>
    <v-card elevation="2" max-width="500px">
      <v-card-title>
        <span class="headline azul-ifrete">Definir nova senha</span>
      </v-card-title>
      <v-card-text class="pt-5">
        <v-form ref="form" :lazy-validation='lazy'>
          <v-text-field
            id="currentPassword"
            label="Senha atual"
            v-model="currentPassword"
            name="Senha"
            placeholder="Digite sua senha atual"
            required 
            type="password"
            :rules="[v => !!v || 'Campo obrigarório!']"
            outlined
          ></v-text-field>
          <v-text-field
            id="newPassword"
            v-model="newPassword"
            label="Nova senha"
            placeholder="Digite sua nova senha"
            name="Senha"
            type="password"
            required 
            :rules="[v => !!v || 'Campo obrigarório!']"
            outlined
          ></v-text-field>
          <v-text-field
            id="passwordConfirmation"
            v-model="newPasswordConfirmation"
            label="Confirmação"
            placeholder="Digite novamente a sua nova senha"
            name="Senha"
            required
            :rules="passwordRulesPlusConfirm"
            type="password"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#97C93C" @click="save" class="white--text" width="100%">Salvar</v-btn>
      </v-card-actions>          
    </v-card>
    <Snackbar/>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      Snackbar: () => import('@/components/utils/Snackbar')
    },
     data () {
      const data = {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: undefined,
        lazy: true,
        passwordRulesPlusConfirm: [
          v => !!v || 'Campo obrigatório!',
          v => (!!v && v === this.newPassword) || 'Senhas não são iguais'
        ],
      }
      return data;
    },
    computed: {
      ...mapGetters({
        getToken: 'getToken'
      })
    },
    methods: {
      ...mapActions({
        changePassword: 'cognito/changePassword'
      }),
      ...mapMutations([
        'setSnackbar'
      ]),
      save(){
        if(!this.$refs.form.validate()) return
        
        this.changePassword({accessToken: this.getToken, previousPassword: this.currentPassword, proposedPassword: this.newPassword })
        .then(() =>{
          this.setSnackbar({
            type: 'success',
            msg: 'Senha atualizada com sucesso.'
          });
        })
        .catch((error) => {
          let message = 'Falha ao alterar a senha. Por favor, tente mais tarde.';
          
          if(error.response.data.message != 'Erro interno.')
            message = error.response.data.message;

          this.setSnackbar({
            type: 'error',
            msg: message
          });
        })
      }
    },
  }
</script>

<style>
  .custom-font-change{
    font-family: 'Poppins', sans-serif !important;
  }

  .azul-ifrete{
    color: #00407A;
  }
</style>
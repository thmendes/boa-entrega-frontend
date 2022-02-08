<template>
  <v-container fluid class="custom-font-change">
    <h1 class="title-calc font-weight-bold">Perfil</h1>
    <h4 class="text font-weight-thin">Gerencie seus dados</h4>
    <v-row>
      <v-col cols="12">
        <ChangePassword />        
      </v-col>
    </v-row>
    <Snackbar/>
  </v-container>
</template>

<script>
  import ChangePassword from './../auth/ChangePassword';

  export default {
    components: {
      ChangePassword, 
      Snackbar: () => import('@/components/utils/Snackbar')
    },
    data: () => ({
    }),
  }
</script>

<style>
  .custom-font-change{
    font-family: 'Poppins', sans-serif !important;
  }

  h4.text{
    color: #929292;
    padding-bottom: 10px;
    font-size: 16px;
  }

  h1.title-calc{
    color: #00407A;
    padding-bottom: 10px;
    font-size: 41px;
  }
</style>
<template>
  <div>
    <v-app-bar absolute color="#2171cc" dense>
      <v-toolbar-title style="color: white"> </v-toolbar-title>
      <v-spacer />
      <v-btn style="margin-left: 20px" href="/entrar"> Entrar </v-btn>
    </v-app-bar>
    <div class="text-center bem-vindo center">
      <p>GSL</p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;800;900&display=swap");
.bem-vindo {
  font-family: "Poppins", sans-serif;
  font-size: 150px;
  font-weight: 500;
  color: aliceblue;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
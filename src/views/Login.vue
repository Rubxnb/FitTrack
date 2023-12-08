<template >
   <div>
     <div :style="{display:'flex',
      justifyContent:'center',
      gap: '10px',
      margin: '30px'}">
      <v-img
        max-width="48"
        src="../../public/fittrackicon.png"
      ></v-img>
      <h1 class="text-primary">FitTrack</h1>
    </div>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Direccion email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña

       <!--  <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a> -->
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Introduce tu contraseña"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        :style="{marginTop:'20px'}"
        @click="login"
      >
        Iniciar Sesión
      </v-btn>
<!-- 
      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text> -->
    </v-card>
  </div>
</template>

<script>
  import { userSession } from '@/services/supabase/userSession';
  export default {
    data: () => ({
      visible: false,
      email: null,
      password: null,
    }),
    methods: {
      async login() {
        const user = await userSession(this.email, this.password);
        if (user) {
          this.$store.commit('session/setSession', {items: user});
        };
      }
    }
  };
</script>

<style>
</style>

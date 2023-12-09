<template>
  <v-app-bar flat border>
    <v-app-bar-title>
      <div
      :style="{display:'flex', alignItems:'center', gap: '1rem'}">
        <v-img src="../../public/fittrackicon.png" width="30px"/>
        <h3 class="text-primary">FitTrack</h3>
      </div>
    </v-app-bar-title>

    <!-- MENU -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar 
        class="avatar" 
        v-bind="props" 
        icon="mdi-account"
        color="#000"
        size="x-large"/>
      </template>
      <v-list :style="{marginTop:'0.3rem',
        padding: '0'}">
        <v-list-item 
          
          @click="logout">
          <div :style="{display:'flex', gap: '0.5rem'}">
            <v-icon 
            class="text-primary"
            icon="mdi-export" />
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
            <v-list-item-action></v-list-item-action>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$store.dispatch('session/closeSession');
    },
  }
}
</script>

<style scoped>
 

  .v-avatar {
    margin-right: 0.5rem;
    background-color: #7178df !important;
    font-size: 20px;
    width: 50px !important;
    height: 50px !important;
  }

  .v-avatar:hover {
    cursor: pointer;
  }
</style>
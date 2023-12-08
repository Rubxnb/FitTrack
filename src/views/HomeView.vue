<template>
  <DefaultView 
    v-if="session"
    :session="session"/>
  <Login v-else/>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from './Login.vue';
import DefaultView from './DefaultView.vue';

export default {
  components: {
    Login,
    DefaultView
  },
  computed: {
    ...mapGetters({
        session: 'session/session',
    }),
  },
  created() {
    this.$store.dispatch('session/getSession');
  },
}
</script>

<style scoped>

</style>
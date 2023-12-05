<!-- eslint-disable vue/no-export-in-script-setup -->
<template>
  <v-container class="container">
    <v-row>
      <v-col>
        <v-text-field
          class="text-primary"
          v-model="email"
          type="text"
          label="e-mail"
          required
        />
        <v-text-field
          class="text-primary"
          v-model="password"
          type="text"
          label="password"
          required
        />
        <v-btn
          @click="loginUser">
          Submit
        </v-btn>

        <h3 v-if="welcome">{{ welcome }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      align="center"
      :style="{gap: '4rem !important'}">
        <Calendar
        @selectRoutineDay="selectRoutineDay"
        />
      </v-col>
      <v-col>
        <RoutineList
        @selectRoutineDay="selectRoutineDay"
        :selectedDate="selectedDate"
        :routine="routine"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { selectRoutine } from '../services/supabase/select';
  import { login } from '../services/supabase/userSession';
  import Calendar from '@/components/Calendar.vue';
  import RoutineList from '@/components/RoutineList.vue';

  export default {
    components: {
      Calendar,
      RoutineList,
    },
    data() {
      return {
        email: null,
        password: null,
        welcome: null,
        routine: [],
        selectedDate: new Date(),
      };
    },
    methods: {
      async selectRoutineDay(selectedDay) {
        if(!selectedDay) {
          selectedDay = new Date();
        }

        this.selectedDate = selectedDay;
        this.routine = await selectRoutine(selectedDay);
      },
      async loginUser() {
      console.log('login');
      const data = await login(this.email, this.password);
      if(data) {
        this.welcome = `WELCOME ${data.user.email}`;
      }
    },
    },
    async created() {
      await this.selectRoutineDay(new Date());
    },

  };
</script>

<style>
  .container {
    margin-top: 3rem;
  }
</style>

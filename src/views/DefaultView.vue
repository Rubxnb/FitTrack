<!-- eslint-disable vue/no-export-in-script-setup -->
<template>
  <AppBar />
  <v-container class="container">
    <v-row >
      <v-col
      align="center"
      :style="{gap: '4rem !important'}">
        <h2 class="text-primary">¡Hola {{ session.Name }}! 💪</h2>
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
import Calendar from '@/components/Calendar.vue';
import RoutineList from '@/components/RoutineList.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    Calendar,
    RoutineList,
    AppBar,
  },
  props: {
    session: Object,
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
    }
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
  .v-toolbar-title__placeholder {
    display: flex !important;
  }
</style>

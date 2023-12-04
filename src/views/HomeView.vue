<!-- eslint-disable vue/no-export-in-script-setup -->
<template>
  <v-container class="container">
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

  export default {
    components: {
      Calendar,
      RoutineList,
    },
    data() {
      return {
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

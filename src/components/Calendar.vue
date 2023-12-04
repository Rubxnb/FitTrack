<!-- eslint-disable vue/no-export-in-script-setup -->
<template>
  <v-row
  justify="center"
  :style="{gap: '1rem'}"
  >
    <DatePicker
    v-model="selectedDate"
    :attributes="attributes"
    @day-click="dayClick"
    />
  </v-row>
  <v-row
  justify="center"
  :style="{width: '300px',
  marginTop: '2rem'}">
    <v-select class="text-primary"
    :style="{width: '150px !important'}"
    label="Filtra por un músculo"
    :items="muscles"
    item-title="Name"
    item-value="MuscleID"
    v-model="selectedMuscle"
    />
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { selectViewDateRutine, selectRoutine } from '../services/supabase/select';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    DatePicker
  },
  emits: ["selectRoutineDay"],
  data() {
    return {
      selectedDate: new Date(),
      attributes: [],
      selectedMuscle: null,
    };
  },
  methods: {
    async dayClick(e) {
      this.daySelected = e;
      this.routine = await selectRoutine(e);
    },
    async getRoutineDays() {
      const days = await selectViewDateRutine();
      this.attributes = [{
        key: 'routineDay',
        highlight: {
          color: 'blue',
          fillMode: 'outline',
        },
        dates: days,
      }];
    },
  },
  async created() {
    this.$store.dispatch('muscles/getMuscles');
    await this.getRoutineDays();
  },
  watch: {
      selectedDate: async function(value) {
        this.$emit('selectRoutineDay', value);},
    },
  computed: {
    ...mapGetters({
        muscles: 'muscles/muscles',
    }),
  }
};
</script>

<style>
.container {
    margin-top: 3rem;
}
</style>

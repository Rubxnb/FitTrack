<template>
  <v-card>
    <v-card-title
      width="100%"
      :style="{backgroundColor:'#7178df'}"
    >
      <p :style="{color: 'white'}">Copiar Rutina</p>
    </v-card-title>
    <v-card-item>
      <v-col>
        <v-row justify="center">
          <h3>{{ formatDate(selectedDate) }}</h3>
        </v-row>
        <v-row>
          <DatePicker
          v-model="selectedDate"
          :attributes="attributes"
          />
        </v-row>
      </v-col>
    </v-card-item>
    <div :style="{display: 'flex',
      justifyContent: 'end '}">
      <v-card-actions
      :style="{width: 'fit-content', gap: '1rem'}">
        <div>
          <v-btn
            color="primary"
            block
            @click="$emit('close')">
            Cancelar
          </v-btn>
        </div>
        <div>
          <v-btn
            color="primary"
            block
            @click="submit()">
            Aceptar
          </v-btn>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>
  
<script>
import { copyRoutineList } from '../services/supabase/crudRoutine';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    DatePicker,
  },
  props: {
    date: Date,
    routine: Array,
  },
  data() {
    return {
      selectedDate: new Date(),
      attributes: [],
    };
  },
  methods: {
    async submit() {
      await copyRoutineList(this.routine, this.selectedDate);
      this.$emit('reloadRoutineList', this.date);
      this.$emit('close');
    },
    formatDate(date) {
      if (!date) {
          date = new Date();
      }
      const fecha = new Date(date);
      return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    },
  },
  async created() {
    this.attributes = [{
      key: 'routineDay',
      highlight: {
        color: 'blue',
        fillMode: 'outline',
      },
      dates: [this.date],
    }];
  }
};
</script>

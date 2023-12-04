<template>
  <v-card>
    <v-card-title
      class="text-primary"
      width="100%"
      :style="{backgroundColor:'#E3F2FD'}"
    >
      <p>Insertar ejercicio</p>
    </v-card-title>
    <v-card-item>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col align="center">
              <v-select class="text-primary"
                :style="{width: '150px !important'}"
                label="Músculo"
                :rules="requiredRule"
                :items="muscles"
                item-title="Name"
                item-value="MuscleID"
                no-data-text="No hay músculos disponibles"
                v-model="selectedMuscle"
                @update:modelValue="muscleSelectedChange"
                required
              />
            </v-col>
            <v-col align="center">
              <v-select class="text-primary"
                :style="{width: '150px !important'}"
                label="Ejercicio"
                :rules="requiredRule"
                :items="exercisesList"
                item-title="Name"
                item-value="ExerciseID"
                no-data-text="No hay ejercicios disponibles"
                v-model="selectedExercise"
                required
              />
            </v-col>
          </v-row>
          <v-row
          align="center">
            <v-col align="center">
              <v-text-field
                class="text-primary"
                v-model="weight"
                :rules="requiredRule"
                type="number"
                label="Peso (Kg)"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                class="text-primary"
                v-model="serie"
                type="number"
                label="Serie"
                required
                :rules="requiredRule"
              />
            </v-col>
              <p class="text-primary">X</p>
            <v-col>
              <v-text-field
                class="text-primary"
                v-model="repetitions"
                type="number"
                label="Repetición"
                required
                :rules="requiredRule"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
            @click="submit">
            Aceptar
          </v-btn>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { selectExercises } from '../services/supabase/select';
  import { insertRoutine, updateRoutine } from '../services/supabase/crudRoutine';

  export default {
    props: {
      routine: {
        default: null,
      },
      date: {
        default: null,
      },
    },
    data() {
      return {
        requiredRule: [
          v => !!v || 'Campo requerido',
        ],
        routineData: null,
        musculo: null,
        selectedMuscle: null,
        selectedExercise: null,
        weight: null,
        serie: null,
        repetitions: null,
        exercisesList: [],
        loadingExercises: false,
      };
    },
    methods: {
      async muscleSelectedChange(value) {
        this.loadingExercises = true;
        this.exercisesList = await selectExercises(value);
        this.selectedExercise = null;
        this.loadingExercises = false;
      },
      async submit() {
        if(await this.validate()) {
          if(!this.routine) {
            await insertRoutine({
              date: this.date,
              ExerciseID: this.selectedExercise,
              weight: this.weight,
              series: this.serie,
              repetitions: this.repetitions
            });
          } else {
            await updateRoutine(this.routine.id,{
              ExerciseID: this.selectedExercise,
              weight: this.weight,
              series: this.serie,
              repetitions: this.repetitions,
            });
          }
          this.$emit('reloadRoutineList', this.date);
          this.$emit('close');
        }
      },
      async validate () {
        const { valid } = await this.$refs.form.validate();
        return valid;
      },
    },
    computed: {
      ...mapGetters({
          muscles: 'muscles/muscles',
      }),
    },
    async created() {
      this.routineData = this.routine;
      if(this.routine) {
        this.selectedMuscle = this.routine.Exercise.MuscleID;
        this.exercisesList = await selectExercises(this.selectedMuscle);
        this.weight = this.routine.weight;
        this.serie = this.routine.series;
        this.repetitions = this.routine.repetitions;
        this.selectedExercise = this.routine.ExerciseID;
      }
    }
  };
</script>

<style>

</style>

<template>
  <v-container>
    <v-row v-if="routine">
      <v-card
        class="mx-auto"
        :style="{width:'400px'}"
      >
        <v-toolbar color="#7178df">
          <v-toolbar-title>{{ formatDate(selectedDate) }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="routine && Object.values(routine).length > 0"
            variant="text"
            icon="mdi-content-copy"
            @click="openCopyRoutine()"
          />
          <v-btn
            variant="text"
            icon="mdi-plus"
            @click="openForm(null)"
          />
        </v-toolbar>
        <v-expansion-panels
          variant="accordion"
        >
          <v-expansion-panel
            v-for="i in Object.keys(routine)"
            :key="i"
          >
            <v-expansion-panel-title
              :style="{gap: '1rem', height: '60px'}">
              <img class="title-img"
                  :src="getMuscleIcon(routine[i][0].Exercise.MuscleID)"
                  alt="Musle Icon"
                />
              <p
                :style="{fontSize: '16px !important'}"
                >
                {{ routine[i][0].Exercise.Name }}
              </p>
            </v-expansion-panel-title>

            <v-expansion-panel-text
              :style="{
                paddingTop:'0px !important',
                paddingBottom: '0px !important'}"
              >
              <v-list>
                <v-list-item
                  v-for="r in routine[i]"
                  :key="r.id"
                  :title="`${r.weight} kg - ${r.series} x ${r.repetitions}`"
                  :style="{
                    borderRadius: '5px',
                    padding:'0',
                    minHeight: 'unset'}"
                >

                  <template
                    v-slot:append
                  >
                    <div>
                      <v-btn
                        color="red"
                        icon="mdi-close"
                        variant="text"
                        @click="openDelete(r.id)"
                      />
                      <v-btn
                        color="green"
                        icon="mdi-pencil"
                        variant="text"
                        @click="openForm(r)"
                      />
                    </div>
                  </template>
                </v-list-item>
                <v-list-item
                  width="100%"
                  :style="{
                    width:'100% !important',
                    borderRadius: '5px',
                    padding:'0',
                    minHeight: 'unset',
                    display: 'flex',
                    justifyContent:'center'}"
                >
                      <v-btn class="btn-add-set"
                      color="#7178df"
                      @click="addSet(routine[i])"
                      :style="{width: '100%'}">
                        Añadir set
                      </v-btn>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-row>
    <v-dialog
      v-model="openFormDialog"
      width="auto"
    >
      <RoutineForm
      :routine="routineSelected"
      :date="selectedDate"
      @close="closeFormDialog"
      @reloadRoutineList="reloadRoutineList"
      />
    </v-dialog>
    <v-dialog
      v-model="openDeleteRoutine"
      width="auto"
    >
      <v-card
        maxWidth="400">
        <v-card-title
          class="text-primary"
          width="100%"
          :style="{backgroundColor:'#7178df'}"
        >
          <p :style="{color: 'white'}">Eliminar ejercicio</p>
        </v-card-title>
        <v-card-text>
          <p>¿Desea eliminar el ejercicio seleccionado?</p>
        </v-card-text>
        <div :style="{display: 'flex',
          justifyContent: 'end '}">
          <v-card-actions>
            <div>
              <v-btn
              color="primary"
              block
              @click="deleteRoutine(this.deleteIDSelected)">
                si
              </v-btn>
            </div>
            <div>
            <v-btn
            color="primary"
            block
            @click="openDeleteRoutine = false">
              no
            </v-btn>
            </div>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="openCopyDialog"
      width="auto">
      <CopyRoutineDialog
        :date="selectedDate"
        :routine="routine"
        @close="closeCopyDialog"
        @reloadRoutineList="reloadRoutineList"/>
    </v-dialog>
  </v-container>
</template>

<script>
import { muscleIcons } from '../assets/muscleIcons.js';
import RoutineForm from './RoutineForm.vue';
import CopyRoutineDialog from './CopyRoutineDialog.vue';
import { deleteRoutine } from '@/services/supabase/crudRoutine';

export default {
  components: {
    RoutineForm,
    CopyRoutineDialog,
  },
  props: {
      routine: Object,
      selectedDate: Date,
  },
  data() {
    return {
      routineSelected: null,
      openFormDialog: false,
      openDeleteRoutine: false,
      deleteIDSelected: null,
      openCopyDialog: false,
    };
  },
  methods: {
    formatDate(date) {
      if (!date) {
        date = new Date();
      }
      const fecha = new Date(date);
      return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    },
    getMuscleIcon(id) {
        return muscleIcons[id];
    },
    openForm(value) {
      this.routineSelected = value;
      this.openFormDialog = true;
    },
    closeFormDialog() {
      this.openFormDialog = false;
    },
    reloadRoutineList(date) {
      this.$emit('selectRoutineDay',date);
    },
    openDelete(id) {
      this.openDeleteRoutine = true;
      this.deleteIDSelected = id;
    },
    async deleteRoutine(id){
      await deleteRoutine(id);
      this.reloadRoutineList(this.selectedDate);
      this.openDeleteRoutine = false;
    },
    openCopyRoutine() {
      this.openCopyDialog = true;
    },
    closeCopyDialog() {
      this.openCopyDialog = false;
    },
    addSet(routine) {
      const newSet = {
        ...routine[0],
        id: null,
        repetitions: null,
        series: null,
        weight: null,
      };
      this.routineSelected = newSet;
      this.openFormDialog = true;
    },
  },
};
</script>

<style>
  .title-img {
    width: 40px !important;
  }
  .v-expansion-panel-text__wrapper {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .v-list-item__content {
    width: 100% !important;
  }

  .btn-add-set {
    width: '100%';
    border: 3px solid #7178df;
  }
</style>

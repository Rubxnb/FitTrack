import { supabase } from "./client";
import store from '@/store';

export const insertRoutine = async (routine) => {
  const { UserID } = store.getters['session/session'];
  const { error } = await supabase
  .from('Routine')
  .insert({...routine, UserID: UserID});

  return error;
};

export const deleteRoutine = async (id) => {
  const { UserID } = store.getters['session/session'];
  const { error } = await supabase
    .from('Routine')
    .delete()
    .eq('id', id)
    .eq('UserID', UserID);
    
    return error;
};

export const updateRoutine = async (id, routine) => {
  const { UserID } = store.getters['session/session'];
  const { error } = await supabase
    .from('Routine')
    .update(routine)
    .eq('id', id)
    .eq('UserID', UserID);

  return error;
};

export const copyRoutineList = async (routines, date) => {
  routines.forEach((routine) => {
    insertRoutine({
      date: date,
      ExerciseID: routine.ExerciseID,
      weight: routine.weight,
      series: routine.series,
      repetitions: routine.repetitions
    })
  });
};

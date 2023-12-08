import { supabase } from "./client";
import store from '@/store';

export const selectMuscles = async () => {
  const { data, error } = await supabase
    .from('Muscle')
    .select('*');

  if (error) {
    throw new error (error.message);
  }

  return data;
};

export const selectExercises = async (MuscleID) => {
  const { data, error } = await supabase
    .from('Exercise')
    .select('*')
    .eq('MuscleID', MuscleID);

  if (error) {
    throw new error (error.message);
  }
  return data;
};

export const selectViewDateRutine = async () => {
  const { UserID } = store.getters['session/session'];
  const { data, error } = await supabase
    .from('distinct_date_routine')
    .select('*')
    .eq('UserID', UserID);
  
  if (error) {
    throw new error (error.message);
  }

  return data.map(x => new Date(x.date));
};

export const selectRoutine = async (date) => {
  const fecha = new Date(date);
  const formattedDate = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
  const { UserID } = store.getters['session/session'];
  const { data, error } = await supabase
    .from('Routine')
    .select('*, Exercise(Name, MuscleID)')
    .eq('date', formattedDate)
    .eq('UserID', UserID);

  if (error) {
    throw new error (error.message);
  }
  return data;
};

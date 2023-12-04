import { supabase } from "./client";

export const insertRoutine = async (routine) => {

  const { error } = await supabase
  .from('Routine')
  .insert(routine);

  return error;
};

export const deleteRoutine = async (id) => {

  const { error } = await supabase
    .from('Routine')
    .delete()
    .eq('id', id);

    return error;
};

export const updateRoutine = async (id, routine) => {
  const { error } = await supabase
    .from('Routine')
    .update(routine)
    .eq('id', id);

  return error;
};

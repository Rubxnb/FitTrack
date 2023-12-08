import { supabase } from "./client";
import { setSession } from "../session/session";

export const userSession = async (email, password) => {
  const singedUser = await supabase.auth.signInWithPassword({
    email, password
  });

  if (singedUser.error) {
    throw new error (singedUser.error.message);
  }

  if(singedUser.data) {
    const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('Email', email);

    if (error) {
      throw new error (error.message);
    }
    setSession(data[0]);
    return data[0];
  } else {
    return null;
  }
};

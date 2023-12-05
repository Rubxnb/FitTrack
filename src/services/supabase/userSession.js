import { supabase } from "./client";

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) {
    throw new error (error.message);
  }

  return data;
};



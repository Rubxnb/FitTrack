
import { createClient } from '@supabase/supabase-js';

const URL = 'https://bhhqkiklhncomrhdqjmj.supabase.co';
/* const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaHFraWtsaG5jb21yaGRxam1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDY0ODcsImV4cCI6MjAxNDYyMjQ4N30.fYCOkLAlGSkT2tw33uvI_cYiTkRl8O4rCjYCTK1x27c'; */

export const supabase = createClient(URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaHFraWtsaG5jb21yaGRxam1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNDY0ODcsImV4cCI6MjAxNDYyMjQ4N30.fYCOkLAlGSkT2tw33uvI_cYiTkRl8O4rCjYCTK1x27c');
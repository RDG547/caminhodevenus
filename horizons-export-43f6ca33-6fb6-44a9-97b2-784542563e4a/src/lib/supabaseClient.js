
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://decfrbkmvprkukqfqnyy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY2ZyYmttdnBya3VrcWZxbnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Njg4MTQsImV4cCI6MjA2NTE0NDgxNH0.F5OwIcR4QN9zeuSOiybYy2zbvorAfpRfjCvMyqW05CE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

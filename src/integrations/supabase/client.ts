import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wfmiaqojzvxnrhgpdsof.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbWlhcW9qenZ4bnJoZ3Bkc29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODAwNDIsImV4cCI6MjA3Njc1NjA0Mn0.wRdVeKcvyzpCoGSZVzYBG1Ehmt-A7wzE92roODOKRTg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
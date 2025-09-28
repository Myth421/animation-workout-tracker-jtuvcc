import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://sthkkwfkylpzmmmscoel.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0aGtrd2ZreWxwem1tbXNjb2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODU3NTgsImV4cCI6MjA3NDY2MTc1OH0.E0uBTMphTgEOGjuUgqwezik-BbGZUGH3PDWB0Opj2Ig";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

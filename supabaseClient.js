// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'; // Troque pelo seu
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'; // Troque pelo seu

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

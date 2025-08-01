// supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'SUA_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'SUA_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

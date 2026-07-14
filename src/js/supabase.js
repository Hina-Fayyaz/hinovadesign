import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://opwbpmqpgudwzssvkotk.supabase.co';
const SUPABASE_ANON_KEY = 'opwbpmqpgudwzssvkotk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

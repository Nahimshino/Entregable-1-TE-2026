import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
	throw new Error('Faltan SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en las variables de entorno.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);


const SUPABASE_URL = "https://adpcqxeyaqoaglgfezjv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_D2GU03r7CUlFXmzw4zun1g_MJg488yw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

window.supabaseClient = supabaseClient;

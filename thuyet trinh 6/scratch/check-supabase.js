const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking Supabase Schema...");
  
  // Try querying a generic table check via RPC if it existed, but since it doesn't,
  // we'll try to just select 1 row from each table we care about to see if it errors.
  const tablesToCheck = ['users', 'games', 'messages', 'friendships', 'devices'];
  
  for (const table of tablesToCheck) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`❌ Table '${table}' check failed: ${error.message} (Code: ${error.code})`);
    } else {
      console.log(`✅ Table '${table}' exists.`);
      
      // Check for specific columns if we can fetch a row, or if empty we might not know columns easily 
      // without querying information_schema. Wait, we can just select specific columns.
      if (table === 'users') {
        const { error: colErr } = await supabase.from('users').select('avatar_url, role').limit(1);
        if (colErr) console.log(`  ❌ Missing columns in users: ${colErr.message}`);
        else console.log(`  ✅ users table has avatar_url and role columns.`);
      }
      if (table === 'games') {
        const { error: colErr } = await supabase.from('games').select('description').limit(1);
        if (colErr) console.log(`  ❌ Missing 'description' column in games: ${colErr.message}`);
        else console.log(`  ✅ games table has 'description' column.`);
      }
    }
  }
}

checkSchema();

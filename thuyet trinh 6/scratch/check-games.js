const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGames() {
  const { error } = await supabase.from('games').select('title, genre, stage, status, href, image, description').limit(1);
  if (error) {
    console.log(`❌ Missing columns in games: ${error.message}`);
  } else {
    console.log(`✅ All columns in 'games' table exist!`);
  }
}

checkGames();

// import { createClient } from '@supabase/supabase-js';

// export function supabaseServer() {
//   const url = process.env.SUPABASE_URL!;
//   const key = process.env.SUPABASE_ANON_KEY!;
//   return createClient(url, key, {
//     auth: { persistSession: false },
//   });
// }

import { createClient } from '@supabase/supabase-js';

export function supabaseServer() {
  const url = process.env.SUPABASE_URL!;
  // server-side: prefer service role; fallback to anon in dev
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}
// key may be a security concern
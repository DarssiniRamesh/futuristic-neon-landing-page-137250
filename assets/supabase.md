Supabase configuration for Neon Cyber React + Tailwind

Status
- Frontend integration is wired using @supabase/supabase-js v2 with a reusable client (src/lib/supabaseClient.js) and a demo realtime hook (src/hooks/useSupabaseRealtime.js).
- Environment variables are required: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.
- This document includes the database schema for a demo messages table and RLS policies to allow anonymous read and realtime subscribe for demonstration only.

Environment variables
1) Create react_tailwind_frontend/.env from .env.example:
   REACT_APP_SUPABASE_URL=https://hawtahapcoolgtgavngc.supabase.co
   REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs...

2) In Supabase Dashboard > Authentication > URL Configuration
   - Site URL: http://localhost:3000 (dev)
   - Add Redirect URLs: http://localhost:3000/** (not required for this demo, but useful for future auth flows)

Database schema
Create a demo table messages for realtime:

SQL:
  -- Enable pgcrypto for gen_random_uuid (if not already enabled)
  create extension if not exists pgcrypto;

  create table if not exists public.messages (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    content text not null,
    author text
  );

Realtime
- Go to Database > Replication > Realtime and ensure the public schema is enabled for Realtime.
- Ensure table messages is included (enabled by default if public is enabled).

Row Level Security (RLS)
Enable RLS and create permissive read policies for anonymous role (demo only).
These policies allow anyone with the anon key to read and subscribe to messages events.
Use stricter policies in production.

SQL:
  -- Enable RLS
  alter table public.messages enable row level security;

  -- Allow read for anon role
  create policy "Allow anon to read messages"
    on public.messages
    for select
    to anon
    using (true);

  -- Allow realtime replication (required for change broadcasts)
  create policy "Allow anon to subscribe (realtime)"
    on public.messages
    for select
    to anon
    using (true);

Optional insert policy (for public demo inserts from client — use carefully):
  -- create policy "Allow anon to insert"
  --   on public.messages
  --   for insert
  --   to anon
  --   with check (true);

Notes:
- If you enable insert for anon, also consider limiting rate or adding captcha on the client.

Frontend usage
- The app shows a small Realtime indicator (bottom-left) connected to public.messages.
- When rows in messages are inserted/updated/deleted, the counter increments.

Troubleshooting
- If no events are received:
  1) Verify .env is set and the app restarted (env changes require restart).
  2) Confirm Realtime is enabled for the public schema.
  3) Confirm RLS policies above are created and RLS is enabled on messages.
  4) Insert a row to test:
     insert into public.messages(content, author) values ('Hello world', 'demo');
  5) Check browser console for any warnings about env variables.

Automation note
- During this run, automated SupabaseTools calls failed due to: "Could not find the function public.run_sql(query) in the schema cache (PGRST202)". If you want us to provision tables and policies automatically, please enable the required helper RPC or provide direct SQL execution access. For now, use the SQL above in the Supabase SQL Editor.

Security
- Do not commit real .env values.
- The anon key must be treated as public but scoped; never expose the service role key in the frontend.

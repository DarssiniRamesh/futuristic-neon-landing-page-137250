Supabase configuration for Neon Cyber React + Tailwind

Status
- Frontend integration is wired using @supabase/supabase-js v2 with a reusable client (src/lib/supabaseClient.js) and a demo realtime hook (src/hooks/useSupabaseRealtime.js).
- Environment variables are required: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.
- This document includes the database schema for a demo messages table and RLS policies to allow anonymous read and realtime subscribe for demonstration only.
- UPDATED: Added a contact_submissions table used by the Contact form. See schema and demo policies below.

Environment variables
1) Create react_tailwind_frontend/.env from .env.example:
   REACT_APP_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs...  -- anon key only

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

-- Contact form submissions table used by the app

Option A (gen_random_uuid):
SQL:
  create table if not exists public.contact_submissions (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    message text not null
  );

Option B (uuid_generate_v4, if you prefer uuid-ossp):
SQL:
  create extension if not exists "uuid-ossp";
  create table if not exists public.contact_submissions (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    message text not null
  );

Note: The frontend expects columns: id (uuid), created_at (timestamptz), name, email, message.

Realtime
- Go to Database > Replication > Realtime and ensure the public schema is enabled for Realtime.
- Ensure tables messages and contact_submissions are included.

Row Level Security (RLS)
Enable RLS and create permissive policies for anonymous role (demo only). Use stricter policies in production.

SQL:
  -- Enable RLS
  alter table public.messages enable row level security;
  alter table public.contact_submissions enable row level security;

  -- Allow SELECT (read/subscribe) for anon role (demo)
  do $$
  begin
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = 'messages' and policyname = 'Allow anon to read messages'
    ) then
      create policy "Allow anon to read messages"
        on public.messages
        for select
        to anon
        using (true);
    end if;

    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = 'contact_submissions' and policyname = 'Allow anon to read contact_submissions'
    ) then
      create policy "Allow anon to read contact_submissions"
        on public.contact_submissions
        for select
        to anon
        using (true);
    end if;
  end $$;

  -- Allow INSERT for anon (demo only; consider rate limits/captcha)
  do $$
  begin
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = 'contact_submissions' and policyname = 'Allow anon to insert contact_submissions'
    ) then
      create policy "Allow anon to insert contact_submissions"
        on public.contact_submissions
        for insert
        to anon
        with check (true);
    end if;
  end $$;

Notes:
- If you enable anon insert, consider adding captcha on client or rate limiting.
- In production, restrict to authenticated users and limit who can read/insert submissions.

How to apply via Supabase UI
1) Open Supabase Dashboard > SQL Editor.
2) Paste the SQL from Option A (or B) plus the RLS blocks and run it.
3) Go to Database > Replication > Realtime and:
   - Ensure the public schema is enabled.
   - Ensure both messages and contact_submissions tables are checked.
4) Test with:
   insert into public.messages(content, author) values ('Hello world', 'demo');
   insert into public.contact_submissions(name, email, message) values ('Jane', 'jane@example.com', 'Hello from demo!');

Frontend usage
- The app shows a small Realtime indicator (bottom-left) connected to public.messages.
- Contact form inserts into public.contact_submissions. A small live list below the form shows new inserts in realtime.

Troubleshooting
- If no events are received:
  1) Verify .env is set (REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY) and the app restarted.
  2) Confirm Realtime is enabled for public schema and both tables are included.
  3) Confirm RLS policies above are created and RLS is enabled on both tables.
  4) Insert a row to test:
     insert into public.messages(content, author) values ('Hello world', 'demo');
     insert into public.contact_submissions(name, email, message) values ('Jane', 'jane@example.com', 'Hello!');
  5) Check browser console for any warnings about env variables.

Automation note
- During this run, automated SupabaseTools calls failed due to: "Could not find the function public.run_sql(query) in the schema cache (PGRST202)". If you want us to provision tables and policies automatically, please enable the required helper RPC or provide direct SQL execution access. For now, use the SQL above in the Supabase SQL Editor.

Security
- Do not commit real .env values.
- The anon key must be treated as public but scoped; never expose the service role key in the frontend.

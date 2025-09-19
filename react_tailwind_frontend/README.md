# Neon Cyber React + Tailwind Landing Page

A creative, responsive React + Tailwind CSS landing page with a futuristic neon theme. Features a full-screen animated hero, sticky neon-glow navbar with smooth scrolling, interactive feature cards, a validated contact form, and a scroll-to-top button.

## Tech
- React 18
- Tailwind CSS 3
- react-scroll
- Google Fonts (Inter, Orbitron)
- Font Awesome Icons
- Supabase (realtime via @supabase/supabase-js)

## Quick Start
- npm install
- Create a .env file (see .env.example) and set:
  - REACT_APP_SUPABASE_URL
  - REACT_APP_SUPABASE_KEY
- npm start

Open http://localhost:3000

## Supabase Setup (Demo)
1) Copy .env.example to .env and fill in your REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.
2) In Supabase SQL editor, create the demo table and RLS (see assets/supabase.md for copy/paste SQL).
3) Enable Realtime for the public schema and messages table (Database > Replication > Realtime).

## Realtime Demo
A small floating indicator (bottom-left) shows Supabase realtime connection status and the number of events received. It subscribes to the 'messages' table by default and listens to all row events (INSERT/UPDATE/DELETE).

To test:
- Ensure your Supabase project has a 'messages' table in 'public' schema.
- Insert or modify rows; you should see the event counter increase.

## Sections
- Home (animated hero)
- About
- Features (interactive cards)
- Contact (simple validation)

## Customize Theme
Edit tailwind.config.js colors or src/index.css root variables. Typography uses Inter (body) and Orbitron (display).

## Notes
- Fully responsive
- Smooth animations and neon accents following the "Neon Cyber" style guide
- Environment variables must be provided; do not hardcode credentials in code.
- See assets/supabase.md for full Supabase configuration details and SQL.

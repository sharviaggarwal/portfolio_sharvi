-- Optional Supabase Schema (if migrating from SQLite to Supabase Postgres + Storage)
-- Run in Supabase Dashboard -> SQL Editor

create table if not exists public.portfolio_projects (
  id text primary key,
  slug text unique not null,
  sort_order integer not null default 1,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_experience (
  id text primary key,
  sort_order integer not null default 1,
  category text not null,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_skills (
  id text primary key,
  sort_order integer not null default 1,
  category_id text not null,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_education (
  id text primary key,
  sort_order integer not null default 1,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_memories (
  id text primary key,
  sort_order integer not null default 1,
  published boolean not null default true,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_experience enable row level security;
alter table public.portfolio_skills enable row level security;
alter table public.portfolio_education enable row level security;
alter table public.portfolio_memories enable row level security;

-- Public can only SELECT published rows; authenticated admin UID manages writes
create policy "Public read published projects" on public.portfolio_projects
  for select using (published = true);
create policy "Admin manage projects" on public.portfolio_projects
  for all using (auth.role() = 'authenticated');

create policy "Public read published experience" on public.portfolio_experience
  for select using (published = true);
create policy "Admin manage experience" on public.portfolio_experience
  for all using (auth.role() = 'authenticated');

create policy "Public read published skills" on public.portfolio_skills
  for select using (published = true);
create policy "Admin manage skills" on public.portfolio_skills
  for all using (auth.role() = 'authenticated');

create policy "Public read published education" on public.portfolio_education
  for select using (published = true);
create policy "Admin manage education" on public.portfolio_education
  for all using (auth.role() = 'authenticated');

create policy "Public read published memories" on public.portfolio_memories
  for select using (published = true);
create policy "Admin manage memories" on public.portfolio_memories
  for all using (auth.role() = 'authenticated');

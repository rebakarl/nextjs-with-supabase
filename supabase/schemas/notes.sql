-- Create the `notes` table
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  content text not null,
  inserted_at timestamp with time zone default timezone('utc', now())
);

-- Enable row level security on the `notes` table
alter table public.notes enable row level security;

-- Allow authenticated users to read, insert, and delete their own notes
create policy "Allow individual read access" on public.notes
  for select using (auth.uid() = user_id);

create policy "Allow individual insert access" on public.notes
  for insert with check (auth.uid() = user_id);

create policy "Allow individual delete access" on public.notes
  for delete using (auth.uid() = user_id);
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  task text not null,
  inserted_at timestamp with time zone default timezone('utc', now())
);

alter table public.todos enable row level security;

create policy "Allow individual read access" on public.todos
  for select using (auth.uid() = user_id);

create policy "Allow individual insert access" on public.todos
  for insert with check (auth.uid() = user_id);

create policy "Allow individual delete access" on public.todos
  for delete using (auth.uid() = user_id);

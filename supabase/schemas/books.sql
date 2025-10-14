create table books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  inserted_at timestamp with time zone default timezone('utc', now())
);

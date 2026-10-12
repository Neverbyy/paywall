create table if not exists public.test_purchases (
  id uuid primary key default gen_random_uuid(),
  offer_id text not null,
  device_id text not null,
  amount integer not null,
  currency text not null default 'RUB',
  created_at timestamptz not null default now()
);

create index if not exists test_purchases_device_id_idx on public.test_purchases (device_id);

alter table public.test_purchases enable row level security;

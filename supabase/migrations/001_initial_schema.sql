-- Users
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  email       text unique,
  phone       text unique,
  name        text,
  created_at  timestamptz default now()
);

-- Products
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  size_ml       integer,
  price_paise   integer not null,
  duration_days integer,
  created_at    timestamptz default now()
);

-- Orders
create table if not exists orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references users(id),
  product_id          uuid references products(id),
  amount_paise        integer,
  status              text default 'pending',
  razorpay_order_id   text,
  shipping_address    jsonb,
  created_at          timestamptz default now()
);

-- Addresses
create table if not exists addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references users(id),
  name        text,
  line1       text,
  line2       text,
  city        text,
  state       text,
  pincode     text,
  phone       text,
  is_default  boolean default false
);

-- Seed products
insert into products (name, size_ml, price_paise, duration_days) values
  ('7 Day Trial Pack', 250,   14900,  7),
  ('30 Day Pack',      1000,  44900,  30),
  ('Quarter Pack',     3000,  129900, 90),
  ('Yearly Pack',      12000, 499900, 365)
on conflict do nothing;

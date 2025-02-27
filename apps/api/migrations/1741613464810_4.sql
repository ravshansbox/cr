-- Up Migration
create table user_registrations (
  id serial primary key,
  user_id int not null references users (id),
  confirmation_code uuid not null,
  valid_until timestamptz not null,
  is_confirmed boolean not null default false
);

-- Down Migration
drop table user_registrations;

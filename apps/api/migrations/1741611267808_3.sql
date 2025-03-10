-- Up Migration
alter table users
  add column is_verified boolean not null default false;
-- Down Migration
alter table users
  drop column is_verified;

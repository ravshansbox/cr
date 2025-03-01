-- Up Migration
create table companies (id serial primary key, name text not null);

create type company_user_role as enum ('owner', 'manager', 'employee');

create table companies_users (
  id serial primary key,
  company_id integer not null references companies (id),
  user_id integer not null references users (id),
  role company_user_role not null,
  unique (company_id, user_id)
);

-- Down Migration
drop table companies_users;

drop type company_user_role;

drop table companies;

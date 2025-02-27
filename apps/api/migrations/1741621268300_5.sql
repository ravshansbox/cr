-- Up Migration
alter table users
add column email text;

update users
set
  email = concat (username, '@cloudretail.pro');

alter table users add constraint email_unique unique (email);

alter table users
alter column email
set
  not null;

-- Down Migration
alter table users
drop column email;

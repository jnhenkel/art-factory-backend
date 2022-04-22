create schema if not exists art_factory;

drop table if exists art_factory.users;

create table art_factory.users (
	id bigserial primary key,
	email varchar(255) not null unique,
	name varchar(255) not null,
	password varchar(255) not null
);
/*
create table art_factory.score (
	id bigserial primary key,
	user_id int references art_factory.users(id),
	date varchar(255) not null,
	score float8 not null
);
*/

create table art_factory.score (
	id bigserial primary key,
	user_email varchar(255) not null,
	date varchar(255) not null,
	score float8 not null,
	art_url varchar(255) not null
);
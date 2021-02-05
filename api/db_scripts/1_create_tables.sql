/* uuid extension */
create extension if not exists "uuid-ossp";

/* entity tabled */
create table if not exists entity (
	id uuid not null default uuid_generate_v4(),
	created_at timestamp not null default now()::timestamp,
	updated_at timestamp not null default now()::timestamp,
	deleted_at timestamp,
	primary key(id)
);

create table if not exists person (
	id uuid not null,
	email varchar(64) unique not null,
	password_hash varchar(64) not null,
	first_name varchar(32) not null,
	last_name varchar(32) not null,
	birthdate date not null check (birthdate > '1900-01-01'::date and birthdate <= current_date),
	primary key (id),
	constraint fk_person_entity foreign key (id) references entity(id)
);

create table if not exists adult (
	id uuid not null,
	phone varchar(10) not null, /* create check constraint here*/
	primary key(id),
	constraint fk_adult_person foreign key (id) references person(id)
);

create table if not exists student (
	id uuid not null,
	school_year int not null check (school_year >= 5 and school_year <=12),
	primary key(id),
	constraint fk_student_person foreign key (id) references person(id)
);	

create table if not exists team (
	id uuid not null,
	team_number int unique not null check (team_number > 0),
	team_name varchar(32) not null,
	primary key (id),
	constraint fk_team_entity foreign key (id) references entity(id)
);

create table if not exists tournament (
	id uuid not null,
	name varchar(32) not null,
	date date not null,
	location varchar(32) not null,
	primary key (id),
	constraint fk_tournament_entity foreign key (id) references entity(id)
);

create table if not exists match (
	id uuid not null,
	number int not null check (number > 0),
	tournament_id uuid not null,
	red_score int check (red_score >= 0),
	blue_score int check (blue_score >= 0),
	scheduled_time time,
	primary key (id),
	constraint fk_match_entity foreign key (id) references entity(id),
	constraint fk_match_tournament foreign key (tournament_id) references tournament(id)
);

create table if not exists award (
	id uuid not null,
	name varchar(32) not null,
	primary key (id),
	constraint fk_award_entity foreign key (id) references entity(id)
);

/* relationship tables */
create table if not exists match_judge (
	match_id uuid not null,
	adult_id uuid not null,
	constraint pk_match_judge primary key (adult_id, match_id),
	constraint fk_match_judge_match foreign key (match_id) references match(id),
	constraint fk_match_judge_adult foreign key (adult_id) references adult(id)
);

create table if not exists match_competitor (
	team_id uuid not null,
	match_id uuid not null,
	constraint pk_match_competitors primary key (team_id, match_id),
	constraint fk_match_competitor_team foreign key (team_id) references team(id),
	constraint fk_match_competitor_match foreign key (match_id) references match(id)
);

create table if not exists tournament_participant (
	tournament_id uuid not null,
	team_id uuid not null,
	qualifying_points int check (qualifying_points >= 0),
	ranking_points int check (ranking_points >= 0),
	constraint pk_tournament_participant primary key (tournament_id, team_id),
	constraint fk_tournament_participant_tournament foreign key (tournament_id) references tournament(id),
	constraint fk_tournament_participant_team foreign key (team_id) references team(id)
);

create table if not exists team_award (
	team_id uuid not null,
	award_id uuid not null,
	constraint pk_team_award primary key (team_id, award_id),
	constraint fk_team_award_team foreign key (team_id) references team(id),
	constraint fk_team_award_award foreign key (award_id) references award(id)
);

create table if not exists team_coach (
	team_id uuid not null,
	coach_id uuid not null,
	constraint pk_team_coach primary key (team_id, coach_id),
	constraint fk_team_coach_team foreign key (team_id) references team(id),
	constraint fk_team_coach_coach foreign key (coach_id) references adult(id)
);
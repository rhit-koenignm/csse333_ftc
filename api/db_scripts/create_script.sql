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
	password_hash varchar(64) not null, /* hashed password */
	first_name varchar(32) not null,
	last_name varchar(32) not null,
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
	alliance_color varchar(4) NOT NULL check(alliance_color = 'Blue' OR alliance_color = 'Red'),
	attending boolean not null default false,
	constraint pk_match_competitors primary key (team_id, match_id),
	constraint fk_match_competitor_team foreign key (team_id) references team(id),
	constraint fk_match_competitor_match foreign key (match_id) references match(id)
);

create table if not exists tournament_participant (
	tournament_id uuid not null,
	team_id uuid not null,
	qualifying_points int check (qualifying_points >= 0),
	ranking_points int check (ranking_points >= 0),
	matches_played SMALLINT NOT NULL DEFAULT 0 CHECK (matches_played >= 0), 
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
);/*
 * A stored procedure for updating a team's qp, rp, or matches played
 * 
 * Returns:
 * 0 - Attendence updated 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function update_team_score(
	given_team uuid,
	added_qp int4 default 0, 
	added_rp int4 default 0,
	added_match_count int2 default 0
)
returns int 
language 'plpgsql'
as $$
declare 
	new_qp int4;
	new_rp int4;
	new_match_count  int2;
begin
--Checking parameters--
	if(select count(*) from tournament_participant where team_id = given_team) < 1 then 
		raise exception 'Team with the given id is not registered for the tournament.';
		return 1;
	end if;

	perform new_qp = tp.qualifying_points + added_qp,
			new_rp = tp.ranking_points + added_rp,
			new_match_count = tp.matches_played + added_match_count
	from tournament_participant tp 
	where tp.team_id = given_team;

/*	select qualifying_points into new_qp from tournament_participant where team_id = given_team;
	select ranking_points into new_rp from tournament_participant where team_id = given_team;
	select matches_played into new_match_count from tournament_participant where team_id = given_team;

	s new_qp = new_qp + added_qp;
	set new_rp = new_rp + added_rp;
	set new_match_count = new_match_count + added_match_count;
*/
	update tournament_participant 
	set qualifying_points = new_qp,
		ranking_points = new_rp,
		matches_played = new_match_count
	where team_id = given_team;

				
	return 0;

end
$$;


/*
 * A function for getting a table of the teams participating, their ranks, qp, rp, and matches played
 * the returned function will be ordered by qp and then rp in descending order
 * 
 * Returns:
 * table - Rankings fetched correctly
 * 
 * Written by: Natalie Koenig
 */

create or replace function get_rankings(
	tourn_id uuid default uuid_nil()
)
returns table (
	rank_num int8,
	participant_id uuid,
	team_num int4,
	qp int4,
	rp int4,
	match_count int2 
)
language 'plpgsql'
as $$
begin 
	return query 
	select row_number() Over(order by qualifying_points desc, ranking_points desc) as rank_number, team.id, team.team_number, tp.qualifying_points, tp.ranking_points, tp.matches_played 
	from tournament_participant tp 
	join team on tp.team_id = team.id
	where tp.tournament_id = tourn_id;
	
end
$$;
/*
 * A function for getting a table of the current and 4 upcoming matches in the match table. Will
 * 
 * Returns:
 * Table
 * 
 * 
 * Written by: Natalie Koenig
 */

drop function if exists get_upcoming_matches;
create or replace function get_upcoming_matches(
	tourn_id uuid default uuid_nil(),
	num_upcoming int4 default 5,
	givenTime time default current_time 
)
returns table (
	upcoming_match_id uuid,
	blue_team_1 uuid,
	blue_team_2 uuid,
	red_team_1 uuid,
	red_team_2 uuid,
	match_time time 
)
language 'plpgsql'
as $$
begin  
		--This is the original which lets us select the times with --
	return query (
		select distinct m.id as upcoming_match_id, m1.team_id as blue_team_1, m2.team_id as blue_team_2, m3.team_id as red_team_1,
		m4.team_id as red_team_2, m.scheduled_time as match_time
		from match m
		join match_competitor m1 
		on m.id = m1.match_id and m1.alliance_color = 'Blue'
		join match_competitor m2
		on m.id = m2.match_id and m1.team_id < m2.team_id and m2.alliance_color = 'Blue'
		join match_competitor m3 
		on m.id = m3.match_id and m3.alliance_color = 'Red'
		join match_competitor m4
		on m.id = m4.match_id and m3.team_id < m4.team_id and m4.alliance_color = 'Red'
		where m.tournament_id = tourn_id and m.scheduled_time >= givenTime
		order by m.scheduled_time asc
		limit num_upcoming
	);

end
$$;	
create or replace view if not exists match_info as select * from match m
left join lateral (
	select array (
		select team_id from match_competitor mc where match_id = m.id
		--join team t on t.id = mc.team_id
		--where match_id = m.id
	) as teams
) t on true;/*
 * A stored procedure for updating the score of a match and 
 * 
 * Returns:
 * 0 - Points successfully distributed 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function update_match_score(
	given_match uuid,
	redScore int4 default 0, 
	blueScore int4 default 0
)
returns int 
language 'plpgsql'
as $$
declare 
	old_red int4;
	old_blue int4;
	new_match_count  int2;
begin
--Checking parameters--
	if(select count(*) from match where match.id = given_match) < 1 then 
		raise exception 'Team with the given id is not registered for the tournament.';
		return 1;
	end if;

	select red_score, blue_score into old_red, old_blue from match
	where id = given_match;

	if old_red != 0 and old_blue != 0 then
		perform undo_match_score(given_match, old_red, old_blue);
	end if;
	
	--first we need to update the match itself--
	update match
	set red_score = redScore, blue_score = blueScore
	where id = given_match;

	--Distribution of points is based off of who is the winner of the match--
	if(redScore > blueScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Red'
		);
		
		--Giving all teams blue score--
		update tournament_participant
		set ranking_points = ranking_points + blueScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	elsif (blueScore > redScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Blue'
		);
		
		--Giving all teams red score--
		update tournament_participant
		set ranking_points = ranking_points + redScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	
	else
		--Giving all teams 1 qp point--
		update tournament_participant
		set qualifying_points = qualifying_points + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
		
		--Giving all teams tied score--
		update tournament_participant
		set ranking_points = ranking_points + redScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	end if;

		
	return 0;

end
$$;
/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_new_entity ()
returns uuid
language 'plpgsql'
as $$
declare
	entity_id uuid;
begin 

entity_id := uuid_generate_v4();
insert into entity (id) values (entity_id);

return entity_id;

end
$$;/*
 * A stored procedure that can update a team entity
 *
 * Returns:
 * 0 - Operation executed successfully
 * 1 - Team does not exist
 * 2 - Team with team number already exists
 * 3 - Id is correct but team number is different, which is not allowed
 *
 * Written by: Nick von Bulow
 */

create or replace function update_team (
    team_id uuid,
    new_team_num int = null,
    new_team_name text = null
)
returns int
language 'plpgsql'
as $$
begin

-- Check parameters

if (select count(*) from team where id = team_id) = 0 then
    raise exception 'team_id does not exist';
   return 1;
end if;

if(select count(*) from team where not id = team_id and team_number = new_team_num) > 0 then
    raise 'Another team with this number already exists';
    return 2;
end if;

if (select count(*) from team where team.id = team_id and team_number <> new_team_num) > 0 then 
	raise 'You cannot change team numbers';
	return 3;
end if;

-- Update the row
update team
set team_number = coalesce(new_team_num, team_number),
    team_name = coalesce(new_team_name, team_name)
where id = team_id;

return 0;

end
$$;
/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Team with the given number already exists
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_team(
	team_num int4,
	new_team_name varchar(32)
)
returns uuid
language 'plpgsql'
as $$
declare entity_id uuid;
begin  
--Check parameters--

--If there is already a team with the given team number, we cannot create a duplicate.--
	if (select count(*) from team where team.team_number = team_num) > 0 then 
		raise exception 'A team with this team number already exists in the table';
		return uuid_nil();
	end if;
	
	entity_id = create_new_entity();

	insert into team (id, team_number, team_name) 
	values (entity_id, team_num, new_team_name);

	return entity_id;

end
$$;
/*
 * A function that can delete a team entity if matches have not been created.
 * There is a team_num inputted that is the team number of the team we are trying to delete.
 *
 * Returns:
 * 0 - Deletion executed correctly
 * 1 - Team with the given id does not exist
 * 2 - Team with the given team number does not exist
 * 3 - Matches have already been created, deletion of teams is prohibited 
 *
 * Written by: Natalie Koenig
 */

create or replace function delete_team (
	team_id uuid,
    team_num int4
)
returns int
language 'plpgsql'
as $$
begin

-- Check parameters--

-- If there is not a team with the given id, we cannot delete it--
if (select count(*) from team where id = team_id) = 0 then
    raise exception 'team_id does not exist';
   return 1;
end if;

-- If there is not a team with the given number, we cannot delete it--
if(select count(*) from team where team_number = team_num) = 0 then
    raise 'The team with this team number does not exist';
    return 2;
end if;

-- If the matches have already been created, we don't want to delete this team.--
if(select COUNT(match.id) from match) > 0 then 
	raise 'Matches have already been created, you cannot delete a team';
	return 3;
end if;

-- Mark the team entity as deleted--
perform delete_entity(team_id);

-- Delete the team
delete from team where id = team_id and team_number = team_num;

return 0;

end
$$;
/*
 * A stored procedure for delete an entity in our database,
 * it returns the an integer upon completetion
 * 
 * Returns:
 * 0 - Deletion executed successfully
 * 1 - Team not found, deletion failed.
 * 
 * Written by: Natalie Koenig
 */

create or replace function delete_entity (
	entity_id uuid	
)
returns int
language 'plpgsql'
as $$
begin 

-- Check parameters--
	if(select count(*) from entity where entity.id = entity_id) = 0 then
		raise exception 'An entity with this id does not exist';
		return 1;
	end if;

	update entity 
	set deleted_at = current_timestamp 
	where entity.id = (entity_id);

	return 0;

end
$$;/*
 * A function for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - One of the teams is not in the team list
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_match(
	tourn_id uuid,
	match_num int4,
	match_time time, 
	red_team_1 uuid,
	red_team_2 uuid,
	blue_team_1 uuid,
	blue_team_2 uuid
)
returns uuid 
language 'plpgsql'
as $$
declare entity_id uuid;
begin  
--Check parameters--
--If the teams do not exist in the competition --
	if (select count(*) from team where (team.id = red_team_1) or (team.id = red_team_2)
		or (team.id = blue_team_1) or (team.id = blue_team_2)) < 4 then 
		raise exception 'One or more teams are not in the competition';
		return 1;
	end if;	

	--Conditions met so we can create the entity id--
	entity_id = create_new_entity();
	
	--creating the match in the match table--
	insert into match (id, "number", tournament_id, red_score, blue_score, scheduled_time) 
	values (entity_id, match_num, tourn_id, 0, 0, match_time);

--Now we want to create tournament_participant entries for each team in the match--

	--creating the second red_team_2--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (red_team_1, entity_id, 'Red', false);
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (red_team_2, entity_id, 'Red', false);	
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (blue_team_1, entity_id, 'Blue', false);	
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (blue_team_2, entity_id, 'Blue', false);
	
	return entity_id;

end
$$;
/*
 * A function for adding a given team listed in the team table into the
 * match participant table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - This team is not in the team list
 * 2 - This team is already added to the tournament_participant 
 * 
 * Written by: Natalie Koenig
 */

create or replace function register_team_for_tournament(
	added_team_id uuid,
	tourn_id uuid default uuid_nil()
)
returns int 
language 'plpgsql'
as $$
declare 
	entity_id uuid;
begin  
	
--Check parameters--
--If the teams do not exist in the competition --
	if (select count(*) from team where team.id = added_team_id) = 0 then 
		raise exception 'Team is not listed in the database.';
		return 1;
	end if;
	
--If the team is already in the tournament_particpant table then there is no need to add it--	
	if (select count(*) from tournament_participant tp where tp.team_id = added_team_id and tp.tournament_id = tourn_id) > 0 then 
		raise exception 'Team is already participating';
		return 2;
	end if;
	
--The team is not in the table, so we can add it to the tournament_participant with the default values
	
	insert into tournament_participant (tournament_id, team_id, qualifying_points, ranking_points, matches_played)
	values (tourn_id, added_team_id, 0, 0, 0);

	

	return 0;

end
$$;
/*
 * A stored procedure for updating a team's attendence in a match 
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Attendence updated 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function update_team_attendance(
	match_id_param uuid,
	team_id_param uuid,
	is_attending boolean default false
	)
returns int 
language 'plpgsql'
as $$
begin
--Checking parameters--
	if(select count(*) from match where match.id = match_id_param) < 1 then 
		raise exception 'Match with the given id does not exist.';
		return 1;
	end if;
	
	update match_competitor 
	set attending = is_attending
	where (match_id = match_id_param) and (team_id = team_id_param);

	return 0;

end
$$;
/*
 * A function for creating a new tournament in the database, returning its id
 */

drop function if exists create_tournament;
create function create_tournament(
    t_name text,
    t_date date,
    t_location text
)
returns uuid
language 'plpgsql'
as $$
declare entity_id uuid;
begin

    entity_id = create_new_entity();

    insert into tournament (id, name, date, location)
    values (entity_id, t_name, t_date, t_location);

    return entity_id;
end
$$;drop function if exists delete_tournament_matches;
create function delete_tournament_matches(
    tourn_id uuid default uuid_nil()
)
returns int
language 'plpgsql'
as $$
-- declare
begin
    delete from match_competitor mc
    using match m
    where m.tournament_id = tourn_id;

    delete from match_judge mj
   	using match m
   	where m.id = mj.match_id;

    delete from match m
    where tournament_id = tourn_id;

    update tournament_participant tp
    set matches_played = 0
    where tournament_id = tourn_id;
   
    return 0;
end
$$;create or replace function get_teams_for_tourn(
    given_tourn uuid default uuid_nil()
)
returns table (id uuid, team_number integer, team_name character varying)
language plpgsql
as $function$
begin  
		--This is the original which lets us select the times with --
	return query (
		select team.id, team.team_number, team.team_name 
		from tournament_participant tp
		join team
		on tp.team_id = team.id 
		where tp.tournament_id = given_tourn
		order by team_number asc
	);
end
$function$;
/*
 * Returns a single tournament with id matching the parameter
 * 
 * Returns:
 * table - Single row containing the tournament
 * 
 * Errors:
 * The tournament does not exist
 * 
 * Written by: Nick von Bulow
 */

create or replace function get_tournament(
	tournament_id uuid default uuid_nil()
)
returns setof tournament
language 'plpgsql'
as $$
begin 
    if (select count(*) from tournament where id = tournament_id) = 0 then
        raise exception 'tournament does not exist';
        return;
    end if;

	return query 
        select t.id, t.name, t.date, t.location from tournament t
        where t.id = tournament_id;
end
$$;/*
 * Returns all matches belonging to this tournament
 * 
 * Returns:
 * table - All matches belonging to the tournament
 * 
 * Errors:
 * The tournament does not exist
 * 
 * Written by: Nick von Bulow
 */

create or replace function get_tournament_matches(
	tourn_id uuid default uuid_nil()
)
returns table (
	id uuid,
	number int4,
	tournament_id uuid,
	red_score int4,
	blue_score int4,
	scheduled_time time,
	red_teams int4[],
	blue_teams int4[]
)
language 'plpgsql'
as $$
begin 
    if (select count(*) from tournament t where t.id = tourn_id) = 0 then
        raise exception 'tournament does not exist';
        return;
    end if;

	return query 
        select * from match m
		left join lateral (
			select array_agg(t.team_number) as red_teams from match_competitor mc
			join team t on t.id = mc.team_id
			where match_id = m.id and alliance_color = 'Red'
		) rt on true
		left join lateral (
			select array_agg(t.team_number) as blue_teams from match_competitor mc
			join team t on t.id = mc.team_id
			where mc.match_id = m.id and alliance_color = 'Blue'
		) bt on true
		where m.tournament_id = tourn_id
        order by m.number;
end
$$;
create unique index if not exists team_number_index ON team (team_number);
create index if not exists match_number_index ON match (number);
create index if not exists tournament_participant_index on tournament_participant(qualifying_points, ranking_points, matches_played);
/*
 * A function for inserting an adult to the adult table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Adult w/ phone number already exists
 * 2 - Adult w/ id already exists
 * Written by: Thomas Nandola
 */

create or replace function insert_adult(
	user_id uuid,
	user_phone varchar(10)
)

returns int
language 'plpgsql'
as $$
declare 

begin
	
	-- checking if id already exists for adult--
	
	if(select count(*) from adult where adult.id = user_id) > 0 then 
	raise exception 'User id already exists for adult! Try again!';
		return 2;
	end if;

	-- checking if phone already exists for adult--
	
	if(select count(*) from adult where adult.phone = user_phone) > 0 then
		raise exception 'Phone number already exists for adult! Try again!';
		return 1;
	end if;

	--inserting person into the adult table--
	

	insert into adult(id, phone)
	values (user_id, user_phone);

	return 0;
	
end
	
$$;

	
	
/*
 * A function for inserting an a match judge to the match_judge table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - match judge w/ match id already exists
 * 2 - match judge w/ adult id already exists
 * Written by: Thomas Nandola
 */

create or replace function insert_match_judge(
	judge_match_id uuid,
	judge_adult_id uuid
)

returns int
language 'plpgsql'
as $$
declare 

begin
	
	-- checking if match id already exists for match judge --
	
	if(select count(*) from match_judge where match_id = judge_match_id) > 0 then 
	raise exception 'Match id already exists for match judge! Try again!';
		return 1;
	end if;

	-- checking if adult id exists for match judge --
	
	if(select count(*) from match_judge where adult_id = judge_adult_id) > 0 then
		raise exception 'Adult id already exists for match judge! Try again!';
		return 2;
	end if;

	-- inserting match judge into the match_judge table --
	

	insert into match_judge(match_id, adult_id)
	values (judge_match_id, judge_adult_id);

	return 0;
	
end
	
$$;

	
	
/*
 * A function for validating credential given by judge when logging in
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Invalid Email
 * 2 - Invalid Password
 * 
 * Written by: Thomas Nandola
 */

create or replace function login_user(

	user_email varchar(64),
	user_password varchar(64)
)

returns int
language 'plpgsql'
as $$
declare 
	pwd_hash text;
	entity_id uuid;

begin
	
	if(select count(*) from person where person.email = user_email) = 0 then 
		return 1;
	end if;

	pwd_hash = (select password_hash from person where person.email = user_email);
	
	
	if(crypt(user_password, pwd_hash) <> pwd_hash) then
		return 2;
	end if;

	return 0;

end

$$;
	
	/*
 * A function for registering a judge to the judge table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - User with email already exists
 * 
 * Written by: Thomas Nandola
 */

create or replace function register_user(
	
	user_email varchar(64),
	user_password varchar(64),
	user_first_name varchar(32),
	user_last_name varchar(32)
)

returns int
language 'plpgsql'
as $$
declare 
	pwd_hash text;
	entity_id uuid;

begin
	
	-- checking if email already exists for user--
	if(select count(*) from person where person.email = user_email) > 0 then
		return 1;
	end if;

	--creating new user account in person table--
	
	pwd_hash = crypt(user_password, gen_salt('md5'));
	entity_id = create_new_entity();

	insert into person(id, email, password_hash, first_name, last_name)
	values (entity_id, user_email, pwd_hash, user_first_name, user_last_name);

	return 0;
	
end
	
$$;

	
	
/*
 * A stored procedure for reverting the score of a match and 
 * 
 * Returns:
 * 0 - Points successfully distributed 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function undo_match_score(
	given_match uuid,
	redScore int4 default 0, 
	blueScore int4 default 0
)
returns int 
language 'plpgsql'
as $$
declare 
	new_qp int4;
	new_rp int4;
	new_match_count  int2;
begin
--Checking parameters--
	if(select count(*) from match where match.id = given_match) < 1 then 
		raise exception 'Team with the given id is not registered for the tournament.';
		return 1;
	end if;

	--Distribution of points is based off of who is the winner of the match--
	if(redScore > blueScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points - 2
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Red'
		);
		
		--Giving all teams blue score--
		update tournament_participant
		set ranking_points = ranking_points - blueScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	elsif (blueScore > redScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points - 2
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Blue'
		);
		
		--Giving all teams red score--
		update tournament_participant
		set ranking_points = ranking_points - redScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	
	else
		--Giving all teams 1 qp point--
		update tournament_participant
		set qualifying_points = qualifying_points - 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
		
		--Giving all teams tied score--
		update tournament_participant
		set ranking_points = ranking_points - redScore
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	end if;

		
	return 0;

end
$$;

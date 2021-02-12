/*
 * A function for getting a table of the current and 4 upcoming matches in the match table
 * 
 * Returns:
 * Table
 * 
 * 
 * Written by: Natalie Koenig
 */

create or replace function get_upcoming_matches(
	tourn_id uuid default uuid_nil(),
	num_upcoming int4 default 5,
	givenTime time default current_time 
)
returns table (
	match_name varchar(3),
	blue_teams int4[],
	red_teams int4[],
	match_time time 
)
language 'plpgsql'
as $$
declare 
	temp_match_id uuid;
	temp_match match;
	blue_teams uuid[];
	red_teams uuid[];
begin  

	return query select m2.id, m2."number" , m2.scheduled_time 
		from "match" m2 
		join match_competitor mc on m2.id = mc.match_id 
		where m2.scheduled_time >= '10:00'
		limit 5;
/*	for temp_match in (
		select m2.id, m2."number" , m2.scheduled_time 
		from "match" m2 
		join match_competitor mc on m2.id = mc.match_id 
		where m2.scheduled_time >= '10:00'
		limit 5
	)
	loop 
		match_name := 'Q' + temp_match.number;
		match_time := temp_match.scheduled_time;
		
		select team.team_number 
		into blue_teams
		from team t join match_competitor mc on mc.team_id = team.id 
		where mc.alliance_color = 'Blue' and mc.match_id = temp_match;
	
	end loop;
	
	insert into blue_teams(blue_team_1 int4, blue_team_2 int4) 
	values(
		select team.team_number 
		from match_competitor mc join team on team.id = mc.team_id
	)
	
	return query 
	select m2.id, m2.number, m2.scheduled_time 
	from "match" m2 
	join match_competitor mc on
	where m2.scheduled_time >= '10:00'
	limit 5;*/
	
end
$$;

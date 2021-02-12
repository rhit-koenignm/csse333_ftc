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
	blue_team_num_1 int4,
	blue_team_num_2 int4,
	red_team_num_1 int4,
	red_team_num_2 int4,
	match_time time 
)
language 'plpgsql'
as $$
declare 
	temp_match_id uuid;
	temp_match match;
	blue_team_id_1 int4;
	blue_team_id_2 int4;
	red_team_id_1 int4;
	red_team_id_2 int4;
begin  

	for temp_match in(
		select match.id, match.number, match.scheduled_time from "match" ASm2
		where Time(m2.scheduled_time) >= givenTime
		limit num_upcoming
	)
	loop 
		
		--return next;
	end loop;

end
$$;

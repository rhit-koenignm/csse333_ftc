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
	blue_team_1 int,
	blue_team_2 int,
	red_team_1 int,
	red_team_2 int,
	match_time time 
)
language 'plpgsql'
as $$
begin  
		--This is the original which lets us select the times with --
	return query (
		select distinct m.id as upcoming_match_id, t1.team_number as blue_team_1, t2.team_number as blue_team_2, t3.team_number as red_team_1,
		t4.team_number as red_team_2, m.scheduled_time as match_time
		from match m
		join match_competitor m1 
		on m.id = m1.match_id and m1.alliance_color = 'Blue'
		join team t1 on m1.team_id = t1.id
		join match_competitor m2
		on m.id = m2.match_id and m1.team_id < m2.team_id and m2.alliance_color = 'Blue'
		join team t2 on m2.team_id = t2.id
		join match_competitor m3 
		on m.id = m3.match_id and m3.alliance_color = 'Red'
		join team t3 on m3.team_id = t3.id
		join match_competitor m4
		on m.id = m4.match_id and m3.team_id < m4.team_id and m4.alliance_color = 'Red'
		join team t4 on m4.team_id = t4.id
		where m.tournament_id = tourn_id and m.scheduled_time >= givenTime
		order by m.scheduled_time asc
		limit num_upcoming
	);

end
$$;	

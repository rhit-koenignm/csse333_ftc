/*
 * A function for getting a table of the current and 4 upcoming matches in the match table. Will
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
	upcoming_match_id uuid,
	blue_team_1 uuid,
	blue_team_2 uuid,
	red_team_1 uuid,
	red_team_2 uuid,
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
		--This is the original which lets us select the times with --
	select MatchID,
		(case when alliance_color = 'Blue' then team_id end) as BlueAlliance,
		(case when alliance_color = 'Red' then team_id end) as RedAlliance
	from (
	select mc.match_id as MatchID,
		mc.team_id,
		mc.alliance_color, 
		m.scheduled_time 
		from match_competitor mc
		join "match" m on mc.match_id = m.id 
		group by match_id, team_id, scheduled_time 
		) sub
	where scheduled_time >= '10:00'
	group by MatchID, team_id, alliance_color 
	order by MatchID, team_id, alliance_color
	limit num_upcoming;
	
end
$$;	

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
	blue_teams uuid;
	red_teams uuid;
begin  
		--This is the original which lets us select the times with --
	return query (
		select distinct m.id as matchID, m1.team_id as BlueTeam1, m2.team_id as BlueTeam2, m3.team_id as RedTeam1,
			m4.team_id as RedTeam2, m.scheduled_time as MatchTime
			from 
		(select upcomingM.id, upcomingM.scheduled_time 
		from match upcomingM
		where upcomingM.scheduled_time >= '10:00'
		) m
		join (
		select mc.match_id, mc.team_id 
		from match_competitor mc 
		where mc.alliance_color = 'Blue' 
		
		) m1 
		on m.id = m1.match_id
		join (
		select mc.match_id, mc.team_id 
		from match_competitor mc 
		where mc.alliance_color = 'Blue'
		) m2
		on m.id = m2.match_id and m1.team_id <> m2.team_id
	join (
	select mc.match_id, mc.team_id 
	from match_competitor mc 
	where mc.alliance_color = 'Red'
	) m3
	on m.id = m3.match_id 
	join (
	select mc.match_id, mc.team_id 
	from match_competitor mc 
	where mc.alliance_color = 'Red'
	) m4
	on m.id = m4.match_id and m3.team_id <> m4.team_id 
	);
	

end
$$;	

/*
 * A function for getting a table of the current and 4 upcoming matches in the match table.
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
	tournament_id uuid,
	upcoming_match_id uuid,
	number int4,
	red_teams int4[],
	blue_teams int4[],
	scheduled_time time
)
language 'plpgsql'
as $$
begin
    if (select count(*) from tournament t where t.id = tourn_id) = 0 then
        raise exception 'tournament does not exist';
        return;
    end if;	
   
	--This is the original which lets us select the times with --
	return query
        select m.tournament_id, m.id, m."number", rt.red_teams, bt.blue_teams, m.scheduled_time 
        from match m
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
		where m.tournament_id = tourn_id and m.scheduled_time >= givenTime
        order by m.number
        limit num_upcoming;
end
$$;	

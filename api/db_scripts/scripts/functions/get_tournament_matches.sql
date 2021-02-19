/*
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
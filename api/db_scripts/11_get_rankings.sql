

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
	join team on tp.team_id = team.id;
	
/*	for temp_team in
		select tp.team_id, tp.qualifying_points, tp.ranking_points, tp.matches_played 
		from tournament_participant as tp
		order by qualifying_points desc, ranking_points desc 
	
	loop
		temp_rank := temp_rank + 1;
		
		participant_id := temp_team.team_id;
		
		select team.team_number 
		into team_num
		from team
		where team.id = temp_team.team_id;
	
		qp := temp_team.qualifying_points;
		rp := temp_team.ranking_points;
		match_count := temp_team.matches_played;
		return next;
	end loop;*/
	

end
$$;

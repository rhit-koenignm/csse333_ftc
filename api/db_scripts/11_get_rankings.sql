

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
	rank_num int,
	id uuid,
	team_num int4,
	qp int4,
	rp int4,
	match_count int2 
)
language 'plpgsql'
as $$
declare 
	temp_team team;
	temp_rank int4 := 0;
begin  

	for temp_team in(
		select team_id, qualifying_points, ranking_points, matches_played from tournament_participant
		order by qualifying_points desc, ranking_points desc 
	)
	loop 
		temp_rank := temp_rank + 1;
		id := temp_team.team_id;
		
		select team.team_number 
		into team_num
		from team as t1
		where t1.id = temp_team.team_id;
	
		qp := temp_team.qualifying_points;
		rp := temp_team.ranking_points;
		match_count := temp_team.matches_played;
		return next;
	end loop;

end
$$;

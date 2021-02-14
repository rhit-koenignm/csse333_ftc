/*
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
	
	select qualifying_points into new_qp from tournament_participant where team_id = given_team;
	select ranking_points into new_rp from tournament_participant where team_id = given_team;
	select matches_played into new_match_count from tournament_participant where team_id = given_team;

	select new_qp = new_qp + added_qp;
	select new_rp = new_rp + added_rp;
	select new_match_count = new_match_count + added_match_count;

	update tournament_participant 
	set qualifying_points = new_qp,
		ranking_points = new_rp,
		matches_played = new_match_count
	where team_id = given_team;
		
	return 0;

end
$$;

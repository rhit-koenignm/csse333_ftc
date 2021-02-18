/*
 * A stored procedure for updating a team's attendence in a match 
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Scores updated 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Nick von Bulow
 */

create or replace function update_match_scores(
	match_id_param uuid,
	red_score_param int,
	blue_score_param int
	)
returns int 
language 'plpgsql'
as $$
begin
--Checking parameters--
	if(select count(*) from match where match.id = match_id_param) < 1 then 
		raise exception 'Match with the given id does not exist.';
		return 1;
	end if;
	
	update match 
	set red_score = red_score_param, blue_score = blue_score_param
	where id = match_id_param;

	return 0;

end
$$;
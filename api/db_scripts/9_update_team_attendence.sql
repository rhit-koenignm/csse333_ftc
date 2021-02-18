/*
 * A stored procedure for updating a team's attendence in a match 
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Attendence updated 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function update_team_attendance(
	match_id_param uuid,
	team_id_param uuid,
	is_attending boolean default false
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
	
	update match_competitor 
	set attending = is_attending
	where (match_id = match_id_param) and (team_id = team_id_param);

	return 0;

end
$$;

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

create or replace function update_team_attendence(
	attending_match_id uuid,
	team_attending uuid,
	attendence_bool boolean default false
	)
returns int 
language 'plpgsql'
as $$
begin
--Checking parameters--
	if(select count(*) from match where match.id = attending_match_id) < 1 then 
		raise exception 'Match with the given id does not exist.';
		return 1;
	end if;
	
	update match_competitor 
	set attending = attendence_bool
	where (match_id = attending_match_id) and (team_id = team_attending);

	return 0;

end
$$;

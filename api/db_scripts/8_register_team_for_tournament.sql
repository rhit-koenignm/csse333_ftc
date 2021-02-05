/*
 * A function for adding a given team listed in the team table into the
 * match participant table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - This team is not in the team list
 * 2 - This team is already added to the tournament_participant 
 * 
 * Written by: Natalie Koenig
 */

create or replace function register_team_for_tournament(
	added_team_id uuid,
	tourn_id uuid default uuid_nil()
)
returns int 
language 'plpgsql'
as $$
declare 
	entity_id uuid;
begin  
	
--Check parameters--
--If the teams do not exist in the competition --
	if (select count(*) from team where team.id = added_team_id) = 0 then 
		raise exception 'Team is not listed in the database.';
		return 1;
	end if;
	
--If the team is already in the tournament_particpant table then there is no need to add it--	
	if (select count(*) from tournament_participant where tournament_participant.team_id = added_team_id) > 0 then 
		raise exception 'Team is already participating';
		return 2;
	end if;
	
--The team is not in the table, so we can add it to the tournament_participant with the default values
	
	insert into tournament_participant (tournament_id, team_id, qualifying_points, ranking_points, matches_played)
	values (tourn_id, added_team_id, 0, 0, 0);

	return 0;

end
$$;

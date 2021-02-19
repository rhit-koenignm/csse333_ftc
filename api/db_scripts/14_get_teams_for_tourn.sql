/*
 * A function for getting a table of the current and 4 upcoming matches in the match table.
 * 
 * Returns:
 * Table
 * 
 * 
 * Written by: Natalie Koenig
 */

create or replace function get_teams_for_tourn(
	given_tourn uuid default uuid_nil()
)
returns table (
	tourn_team_id uuid,
	tourn_team_num int4,
	tourn_team_name varchar(32)
)
language 'plpgsql'
as $$
begin  
		--This is the original which lets us select the times with --
	return query (
		select team.id, team.team_number, team.team_name 
		from tournament_participant tp
		join team
		on tp.team_id = team.id 
		where tp.tournament_id = given_tourn
	);
end
$$;	

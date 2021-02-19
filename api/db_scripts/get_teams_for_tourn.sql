create or replace function get_teams_for_tourn(
    given_tourn uuid default uuid_nil()
)
returns table (id uuid, team_number integer, team_name character varying)
language plpgsql
as $function$
begin  
		--This is the original which lets us select the times with --
	return query (
		select team.id, team.team_number, team.team_name 
		from tournament_participant tp
		join team
		on tp.team_id = team.id 
		where tp.tournament_id = given_tourn
		order by team_number asc
	);
end
$function$;

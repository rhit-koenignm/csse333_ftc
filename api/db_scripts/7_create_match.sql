/*
 * A function for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - One of the teams is not in the team list
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_match(
	tourn_id uuid,
	match_num int4,
	match_time time, 
	red_team_1 int4,
	red_team_2 int4,
	blue_team_1 int4,
	blue_team_2 int4
)
returns int 
language 'plpgsql'
as $$
declare entity_id uuid;
begin  
--Check parameters--
--If the teams do not exist in the competition --
	if (select count(*) from team where (team.team_number = red_team_1) or (team.team_number = red_team_2)
		or (team.team_number = blue_team_1) or (team.team_number = blue_team_2)) < 4 then 
		raise exception 'One or more teams are not in the competition';
		return 1;
	end if;	

	--Conditions met so we can create the entity id--
	entity_id = create_new_entity();
	
	--creating the match in the match table--
	insert into match (id, "number", tournament_id, red_score, blue_score, scheduled_time) 
	values (entity_id, match_num, tourn_id, 0, 0, match_time);

--Now we want to create tournament_participant entries for each team in the match--

	--creating the second red_team_2--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (red_team_1, entity_id, 'Red', false);
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (red_team_2, entity_id, 'Red', false);	
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (blue_team_1, entity_id, 'Blue', false);	
	
	--creating the first blue team's competitor row--
	insert into match_competitor (team_id, match_id, alliance_color, attending)
	values (blue_team_2, entity_id, 'Blue', false);
	
	return 0;

end
$$;

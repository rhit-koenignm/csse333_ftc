/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Written by: Natalie Koenig
 */

create or replace procedure CreateNewTeam(
	team_num intout int4,
	new_team_name inout varchar(32)
)
language 'plpgsql'
as $$
begin 
	IF(COUNT(select team.team_number from team where team.team_number = team_num) > 0)
	begin 
		PRINT 'A team with this team number already exists in the table'
		return 1
	end
	
	declare entity_id uuid
	entity_id = createNewEntity(:entity_id);

	declare teamName varchar(32) = 'Dynamic Signals'

	insert into team (id, team_number, team_name) 
	values (entity_id, team_num, new_team_name);

end
$$;

call CreateNewTeam(7351, 'Dynamic Signals');
select version()

select *
from team t2 

/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Team with the given number already exists
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_team(
	team_num int4,
	new_team_name varchar(32)
)
returns uuid
language 'plpgsql'
as $$
declare entity_id uuid;
begin  
--Check parameters--

--If there is already a team with the given team number, we cannot create a duplicate.--
	if (select count(*) from team where team.team_number = team_num) > 0 then 
		raise exception 'A team with this team number already exists in the table';
		return uuid_nil();
	end if;
	
	entity_id = create_new_entity();

	insert into team (id, team_number, team_name) 
	values (entity_id, team_num, new_team_name);

	return entity_id;

end
$$;

/*
 * A stored procedure that can update a team entity
 *
 * Returns:
 * 0 - Operation executed successfully
 * 1 - Team does not exist
 * 2 - Team with team number already exists
 * 3 - Id is correct but team number is different, which is not allowed
 *
 * Written by: Nick von Bulow
 */

create or replace function update_team (
    team_id uuid,
    new_team_num int = null,
    new_team_name text = null
)
returns int
language 'plpgsql'
as $$
begin

-- Check parameters

if (select count(*) from team where id = team_id) = 0 then
    raise exception 'team_id does not exist';
   return 1;
end if;

if(select count(*) from team where not id = team_id and team_number = new_team_num) > 0 then
    raise 'Another team with this number already exists';
    return 2;
end if;

if (select count(*) from team where team.id = team_id and team_number <> new_team_num) > 0 then 
	raise 'You cannot change team numbers';
	return 3;
end if;

-- Update the row
update team
set team_number = coalesce(new_team_num, team_number),
    team_name = coalesce(new_team_name, team_name)
where id = team_id;

return 0;

end
$$;

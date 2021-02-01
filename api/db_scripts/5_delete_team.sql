/*
 * A function that can delete a team entity if matches have not been created.
 * There is a team_num inputted that is the team number of the team we are trying to delete.
 *
 * Returns:
 * 0 - Deletion executed correctly
 * 1 - Team with the given id does not exist
 * 2 - Team with the given team number does not exist
 * 3 - Matches have already been created, deletion of teams is prohibited 
 *
 * Written by: Natalie Koenig
 */

create or replace function delete_team (
    team_num int4
)
returns int
language 'plpgsql'
as $$
begin

-- Check parameters--

-- If there is not a team with the given id, we cannot delete it--
if (select count(*) from team where id = team_id) = 0 then
    raise exception 'team_id does not exist';
   return 1;
end if;

-- If there is not a team with the given number, we cannot delete it--
if(select count(*) from team where team_number = team_num) = 0 then
    raise 'The team with this team number does not exist';
    return 2;
end if;

-- If the matches have already been created, we don't want to delete this team.--
if(select COUNT(match.id) from match) > 0 then 
	raise 'Matches have already been created, you cannot delete a team'
	return 3;
end if;

-- Delete the team
delete from team
where id = team_id and team_number = team_num;

return 0;

end
$$;

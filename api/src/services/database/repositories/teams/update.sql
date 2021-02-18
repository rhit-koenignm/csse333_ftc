/* Updates a team */
select update_team(${team_id}::uuid, ${team_number}::int, ${team_name}::text) as result;
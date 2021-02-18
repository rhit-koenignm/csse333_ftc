/*
 * A function for getting a table of the teams participating, their ranks, qp, rp, and matches played
 * the returned function will be ordered by qp and then rp in descending order
 * 
 * Returns:
 * table - Single row containing the tournament
 * 
 * Errors:
 * The tournament does not exist
 * 
 * Written by: Nick von Bulow
 */

create or replace function get_tournament(
	tournament_id uuid default uuid_nil()
)
returns setof tournament
language 'plpgsql'
as $$
begin 
    if (select count(*) from tournament where id = tournament_id) = 0 then
        raise exception 'tournament does not exist';
        return;
    end if;

	return query 
        select t.id, t.name, t.date, t.location from tournament t
        where t.id = tournament_id;
end
$$;
drop function if exists generate_tournament_matches;
create function generate_tournament_matches(
    tourn_id uuid default uuid_nil()
)
returns int
language 'plpgsql'
as $$
-- declare
begin
    if (select count(*) from tournament where id = tourn_id) < 1 then
        raise exception 'tournament does not exist';
        return 1;
    end if;

    if (select count(*) from match where tournament_id = tourn_id) > 0 then
        raise exception 'tournament matches already generated';
        return 2;
    end if;


end
$$;
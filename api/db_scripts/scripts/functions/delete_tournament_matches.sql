drop function if exists delete_tournament_matches;
create function delete_tournament_matches(
    tourn_id uuid default uuid_nil()
)
returns int
language 'plpgsql'
as $$
-- declare
begin
    delete from match_competitor mc
    using match m
    where m.tournament_id = tourn_id;

    delete from match_judge mj
   	using match m
   	where m.id = mj.match_id;

    delete from match m
    where tournament_id = tourn_id;

    update tournament_participant tp
    set matches_played = 0
    where tournament_id = tourn_id;
   
    return 0;
end
$$;
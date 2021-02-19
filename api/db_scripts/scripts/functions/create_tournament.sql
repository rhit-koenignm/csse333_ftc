/*
 * A function for creating a new tournament in the database, returning its id
 */

drop function if exists create_tournament;
create function create_tournament(
    t_name text,
    t_date date,
    t_location text
)
returns uuid
language 'plpgsql'
as $$
declare entity_id uuid;
begin

    entity_id = create_new_entity();

    insert into tournament (id, name, date, location)
    values (entity_id, t_name, t_date, t_location);

    return entity_id;
end
$$;
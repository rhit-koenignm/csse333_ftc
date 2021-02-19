/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Written by: Natalie Koenig
 */

create or replace function create_new_entity ()
returns uuid
language 'plpgsql'
as $$
declare
	entity_id uuid;
begin 

entity_id := uuid_generate_v4();
insert into entity (id) values (entity_id);

return entity_id;

end
$$;
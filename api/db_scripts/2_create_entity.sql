/*
 * A stored procedure for creating a new entity in our database,
 * it returns the ID created so that the new entity can be referenced.
 * 
 * Written by: Natalie Koenig
 */

create or replace procedure createNewEntity{
	entity_id inout uuid
}
language 'plpgsql'
as $$
begin 
	--We'll make a temp variable to store the id in so we can return it--
	entity_id = uuid_generate_v4()
	
	insert into entity (id) VALUES (@entity_id)
end;


call createNewEntity(:entity_id);
select version()
	
select * 
from entity
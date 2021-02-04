/*
 * A stored procedure for delete an entity in our database,
 * it returns the an integer upon completetion
 * 
 * Returns:
 * 0 - Deletion executed successfully
 * 1 - Team not found, deletion failed.
 * 
 * Written by: Natalie Koenig
 */

create or replace function delete_entity (
	entity_id uuid	
)
returns int
language 'plpgsql'
as $$
begin 

-- Check parameters--
	if(select count(*) from entity where entity.id = entity_id) = 0 then
		raise exception 'An entity with this id does not exist';
		return 1;
	end if;

	update entity 
	set deleted_at = current_timestamp 
	where entity.id = (entity_id);

	return 0;

end
$$;
/*
 * A function for inserting an adult to the adult table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Adult w/ phone number already exists
 * 2 - Adult w/ id already exists
 * Written by: Thomas Nandola
 */

create or replace function insert_adult(
	user_id uuid,
	user_phone varchar(10)
)

returns int
language 'plpgsql'
as $$
declare 

begin
	
	-- checking if id already exists for adult--
	
	if(select count(*) from adult where adult.id = user_id) > 0 then 
	raise exception 'User id already exists for adult! Try again!';
		return 2;
	end if;

	-- checking if phone already exists for adult--
	
	if(select count(*) from adult where adult.phone = user_phone) > 0 then
		raise exception 'Phone number already exists for adult! Try again!';
		return 1;
	end if;

	--inserting person into the adult table--
	

	insert into adult(id, phone)
	values (user_id, user_phone);

	return 0;
	
end
	
$$;

	
	

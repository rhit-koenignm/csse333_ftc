/*
 * A function for registering a judge to the judge table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - User with email already exists
 * 2 - 
 * 
 * Written by: Thomas Nandola
 */

create or replace function register_user(
	
	user_email varchar(64),
	user_password varchar(64),
	user_first_name varchar(32),
	user_last_name varchar(32)
)

returns int
language 'plpgsql'
as $$
declare 
	pwd_hash text;
	entity_id uuid;

begin
	
	-- checking if email already exists for user--
	if(select count(*) from person p where email = user_email) > 0 then
		raise exception 'Email already exists!';
		return 1;
	end if;

	--creating new user account in person table--
	
	select pwd_hash = crypt(user_password, gen_salt('md5'));
	entity_id = create_new_entity();

	insert into person(id, email, password_hash, first_name, last_name)
	values (entity_id, user_email, pwd_hash, user_first_name, user_last_name);

	return 0;
	
end
	
$$;

	
	

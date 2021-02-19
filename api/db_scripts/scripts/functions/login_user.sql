/*
 * A function for validating credential given by judge when logging in
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - Invalid Email
 * 2 - Invalid Password
 * 
 * Written by: Thomas Nandola
 */

create or replace function login_user(

	user_email varchar(64),
	user_password varchar(64)
)

returns int
language 'plpgsql'
as $$
declare 
	pwd_hash text;
	entity_id uuid;

begin
	
	if(select count(*) from person where person.email = user_email) = 0 then 
		return 1;
	end if;

	pwd_hash = (select password_hash from person where person.email = user_email);
	
	
	if(crypt(user_password, pwd_hash) <> pwd_hash) then
		return 2;
	end if;

	return 0;

end

$$;
	
	
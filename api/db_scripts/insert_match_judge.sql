/*
 * A function for inserting an a match judge to the match_judge table
 * 
 * Returns:
 * 0 - Insertion executed correctly
 * 1 - match judge w/ match id already exists
 * 2 - match judge w/ adult id already exists
 * Written by: Thomas Nandola
 */

create or replace function insert_match_judge(
	judge_match_id uuid,
	judge_adult_id uuid
)

returns int
language 'plpgsql'
as $$
declare 

begin
	
	-- checking if match id already exists for match judge --
	
	if(select count(*) from match_judge where match_id = judge_match_id) > 0 then 
	raise exception 'Match id already exists for match judge! Try again!';
		return 1;
	end if;

	-- checking if adult id exists for match judge --
	
	if(select count(*) from match_judge where adult_id = judge_adult_id) > 0 then
		raise exception 'Adult id already exists for match judge! Try again!';
		return 2;
	end if;

	-- inserting match judge into the match_judge table --
	

	insert into match_judge(match_id, adult_id)
	values (judge_match_id, judge_adult_id);

	return 0;
	
end
	
$$;

	
	

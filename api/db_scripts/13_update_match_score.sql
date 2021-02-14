/*
 * A stored procedure for updating the score of a match and 
 * 
 * Returns:
 * 0 - Points successfully distributed 
 * 1 - Match with the given match id does not exist
 * 
 * Written by: Natalie Koenig
 */

create or replace function update_match_score(
	given_match uuid,
	redScore int4 default 0, 
	blueScore int4 default 0
)
returns int 
language 'plpgsql'
as $$
declare 
	new_qp int4;
	new_rp int4;
	new_match_count  int2;
begin
--Checking parameters--
	if(select count(*) from match where match.id = given_match) < 1 then 
		raise exception 'Team with the given id is not registered for the tournament.';
		return 1;
	end if;
	
	--first we need to update the match itself--
	update match
	set red_score = redScore, blue_score = blueScore
	where id = given_match;

	--Distribution of points is based off of who is the winner of the match--
	if(redScore > blueScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Red'
		);
		
		--Giving all teams blue score--
		update tournament_participant
		set ranking_points = ranking_points + blueScore
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	elsif (blueScore > redScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Blue'
		);
		
		--Giving all teams red score--
		update tournament_participant
		set ranking_points = ranking_points + redScore
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	
	else
		--Giving all teams 1 qp point--
		update tournament_participant
		set qualifying_points = qualifying_points + 2
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
		
		--Giving all teams tied score--
		update tournament_participant
		set ranking_points = ranking_points + redScore
		where team_id = (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	end if;

		
	return 0;

end
$$;

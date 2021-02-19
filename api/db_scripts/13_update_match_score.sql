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
	old_red int4;
	old_blue int4;
	new_match_count  int2;
begin
--Checking parameters--
	if(select count(*) from match where match.id = given_match) < 1 then 
		raise exception 'Team with the given id is not registered for the tournament.';
		return 1;
	end if;

	select red_score, blue_score into old_red, old_blue from match
	where id = given_match;

	if old_red != 0 and old_blue != 0 then
		perform undo_match_score(given_match, old_red, old_blue);
	end if;
	
	--first we need to update the match itself--
	update match
	set red_score = redScore, blue_score = blueScore
	where id = given_match;

	--Distribution of points is based off of who is the winner of the match--
	if(redScore > blueScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2,
			ranking_points = ranking_points + blueScore,
			matches_played = matches_played + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Red'
		);
		
		--Giving all teams blue score--
		update tournament_participant
		set ranking_points = ranking_points + blueScore,
			matches_played = matches_played + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match AND mc.alliance_color = 'Blue'
		);
	elsif (blueScore > redScore) then
		--Giving winners 2 qp points--
		update tournament_participant
		set qualifying_points = qualifying_points + 2,
			ranking_points = ranking_points + redScore,
		    matches_played = matches_played + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match and mc.alliance_color = 'Blue'
		);
		
		--Giving all red teams red score--
		update tournament_participant
		set ranking_points = ranking_points + redScore,
		    matches_played = matches_played + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match AND mc.alliance_color = 'Red'
		);
	else		
		--Giving all teams tied score--
		update tournament_participant
		set qualifying_points = qualifying_points + 1,
		    ranking_points = ranking_points + redScore,
		    matches_played = matches_played + 1
		where team_id in (
			select team_id 
			from match_competitor mc 
			where mc.match_id = given_match
		);
	end if;

		
	return 0;

end
$$;

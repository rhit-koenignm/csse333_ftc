/*
 * A test script for our match stored procedures, create update and delete.
 * Uncomment the queries one by one to see the functionality of each.
 *
 * Written by: Natalie Koenig
 */

/*This first part will test that we can create a  */
--SELECT * from create_team(7351, 'Dynamic Signals');--


/*select * from create_team(8123, 'Duct tape and a prayer');
select * from create_team(6969, 'Nice');
select * from create_team(9999, 'The ninety-niners');*/

--select *, (select register_team_for_tournament(id, uuid_nil())) as result from team;
--select * from register_team_for_tournament(select team.id from team where team_number = 7351);
--select * from register_team_for_tournament(select team.id from team where team_number = 8123);
--select * from register_team_for_tournament(select team.id from team where team_number = 6969);
--select * from register_team_for_tournament(select team.id from team where team_number = 9999);

--drop function get_rankings;
drop function get_upcoming_matches;

select * from match;

select * from team;

select * from tournament_participant;

select * from update_match_score('cfbabcd2-b44c-4dcc-b583-6b6a4c7d8d7f', uuid_nil(), 230, 250) 

select * from get_upcoming_matches(uuid_nil(), 5, cast('10:00:00' as time));

select * from get_rankings();

select * from update_team_score('d6b0e2ab-97ca-47f5-b25c-d1967c9dbb63'::uuid, -2::int4, -1::int4, 1::int2);

select * from update_team_score('d6b0e2ab-97ca-47f5-b25c-d1967c9dbb63', 2, 4, 1::int2);

select * from register_team_for_tournament('0eb9cd62-d17b-428d-8a60-8c21f96c7b3a');
select * from register_team_for_tournament('b2af4dbf-561f-4b18-b799-eaafb9811ca7');
select * from register_team_for_tournament('d6b0e2ab-97ca-47f5-b25c-d1967c9dbb63');
select * from register_team_for_tournament('0de08b9d-a1e3-42b8-b384-099fb310a3c0');

/*select * from create_match(uuid_nil(), 1, '10:00AM'::time, 'b2af4dbf-561f-4b18-b799-eaafb9811ca7'::uuid, '0de08b9d-a1e3-42b8-b384-099fb310a3c0'::uuid, 'd6b0e2ab-97ca-47f5-b25c-d1967c9dbb63'::uuid, '60e08bc7-d09e-46ff-9c03-cd1992b0f1f6'::uuid);

select * from update_team_attendence('cfbabcd2-b44c-4dcc-b583-6b6a4c7d8d7f', 'b2af4dbf-561f-4b18-b799-eaafb9811ca7', true);
select * from match_competitor;

select * from match;
select * from match_competitor;
select * from tournament_participant;
select * from team;*/

/*This next part will test that we can update a team's info. We shouldn't be able to change the team number as that 
 is the primary key for the team table*/

--SELECT * from update_team('0eb9cd62-d17b-428d-8a60-8c21f96c7b3a', 5678, 'Zip ties save lives');
--select * from team--

/*This next part will test that we can delete a team's info. We shouldn't be able to change the team number as that 
 is the primary key for the team table*/
--SELECT * from delete_team('71c20948-82d0-488b-a754-b193fefee8d7', 1235);
--select * from TEAM


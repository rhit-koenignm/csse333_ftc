/*
 * A test script for our team stored procedures, create update and delete.
 * Uncomment the queries one by one to see the functionality of each.
 *
 * Written by: Natalie Koenig
 */

/*This first part will test that we can create a team. 
--SELECT * from create_team(7351, 'Dynamic Signals');--
--select * from team--

/*This next part will test that we can update a team's info. We shouldn't be able to change the team number as that 
 is the primary key for the team table*/

--SELECT * from update_team('0eb9cd62-d17b-428d-8a60-8c21f96c7b3a', 5678, 'Zip ties save lives');
--select * from team--

/*This next part will test that we can delete a team's info. We shouldn't be able to change the team number as that 
 is the primary key for the team table*/
--SELECT * from delete_team('71c20948-82d0-488b-a754-b193fefee8d7', 1235);
--select * from TEAM


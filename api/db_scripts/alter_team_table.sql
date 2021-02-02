 /*
 * A query for altering the tournament_participant table, so a new column containing the 
 * number of 
 * 
 * Written by: Natalie Koenig
 */

alter table tournament_participant
add matches_played smallint not null
default 0
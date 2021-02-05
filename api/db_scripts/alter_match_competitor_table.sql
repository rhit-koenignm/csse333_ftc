 /*
 * A query for altering the match_competitor table, so a new column containing the 
 * color of 
 * 
 * Written by: Natalie Koenig
 */

alter table match_competitor 
--add alliance_color varchar(4) NOT NULL check(alliance_color = 'Blue' OR alliance_color = 'Red')
add attending boolean not null default false 
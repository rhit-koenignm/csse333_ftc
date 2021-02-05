/* lists all the teams competing in a match */
select * from match_competitor mc
left join team t on t.id = mc.team_id
where mc.match_id = ${match_id};
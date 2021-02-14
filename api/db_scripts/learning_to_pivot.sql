




select MatchID,
	(case when alliance_color = 'Blue' then team_id end) as BlueAlliance,
	(case when alliance_color = 'Blue' then team_id end) as BlueAlliance,
	(case when alliance_color = 'Red' then team_id end) as RedAlliance,
	(case when alliance_color = 'Red' then team_id end) as RedAlliance
from (
select mc.match_id as MatchID,
	mc.team_id,
	mc.alliance_color, 
	m.scheduled_time 
	from match_competitor mc
	join "match" m on mc.match_id = m.id 
	group by match_id, team_id, alliance_color, scheduled_time 
) sub
where scheduled_time >= '10:00'
group by MatchID, team_id, alliance_color 
order by MatchID, team_id, alliance_color 
limit 5;

/*
select match_id, BlueTeam1, BlueTeam2, RedTeam1, RedTeam2
from 
(select match_id, team_id, alliance_color 
 from match_competitor) mc
 PIVOT 
 COUNT (match_id) for team_id in (BlueTeam1, BlueTeam2, RedTeam1, RedTeam2) as pvt
 order by pvt.match_id;*/
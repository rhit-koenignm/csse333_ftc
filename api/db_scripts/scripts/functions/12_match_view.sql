create or replace view match_info as select * from match m
left join lateral (
	select array (
		select team_id from match_competitor mc where match_id = m.id
		--join team t on t.id = mc.team_id
		--where match_id = m.id
	) as teams
) t on true;
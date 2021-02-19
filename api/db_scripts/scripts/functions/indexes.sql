
create unique index if not exists team_number_index ON team (team_number);
create index if not exists match_number_index ON match (number);
create index if not exists tournament_participant_index on tournament_participant(qualifying_points, ranking_points, matches_played);

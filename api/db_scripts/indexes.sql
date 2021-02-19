CREATE unique INDEX team_number_index ON team (team_number)
CREATE INDEX match_number_index ON match (number)
CREATE index tournament_participant_index on tournament_participant(qualifying_points, ranking_points, matches_played)

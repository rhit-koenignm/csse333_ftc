import { Team } from './Team';

export interface MatchTeam {
    team_id: string,
    team_number: string,
    team_name: string,
    alliance_color: 'Red' | 'Blue',
    attending: boolean,
}

export interface Match {
    id: string,
    number: number,
    tournament_id: string,
    red_score: number,
    blue_score: number,
    scheduled_time: string,
    teams: string[] | MatchTeam[],
}

export interface UpcomingMatch {
    match_name: string;
    blue_team_num_1: number;
    blue_team_num_2: number;
    red_team_num_1: number;
    red_team_num_2: number;
    match_time: string;
}
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
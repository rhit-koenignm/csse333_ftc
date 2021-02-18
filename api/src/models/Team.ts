
export interface Team {
    id: string;
    team_number: number;
    team_name: string;
}

export interface TeamRanking {
    rank_num: string;
    participant_id: string;
    team_num: number;
    qp: number;
    rp: number;
    match_count: number;
}
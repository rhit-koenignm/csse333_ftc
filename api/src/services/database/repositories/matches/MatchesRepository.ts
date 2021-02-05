import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Match, MatchTeam } from '../../../../models/Match';

const findAllQuery = sql('matches/findAll.sql');
const findOneQuery = sql('matches/findOne.sql');
const findMatchTeamsQuery = sql('matches/findMatchTeams.sql');
const updateAttendanceQuery = sql('matches/updateTeamAttendance.sql');
const updateScoresQuery = sql('matches/updateScores.sql');

export class MatchesRepository {
    constructor(private _db: AppDatabase) {}

    public async findAll() : Promise<Match[]> {
        return this._db.any(findAllQuery);
    }

    public async findOne(id: string): Promise<Match> {
        let matchInfo = await this._db.one<Match>(findOneQuery, {
            match_id: id,
        });

        let matchTeams = await this._db.any<MatchTeam>(findMatchTeamsQuery, {
            match_id: id,
        });

        matchInfo.teams = matchTeams;

        return matchInfo;
    }

    public async updateDetails(
        id: string,
        redScore: number,
        blueScore: number,
        attendance: { team_id: string, attendance: boolean }[],
    ): Promise<number> {
        for(let teamAttendance of attendance) {
            await this._db.one<{ result: number}>(updateAttendanceQuery, {
                matchId: id,
                teamId: teamAttendance.team_id,
                attendance: teamAttendance.attendance,
            });
        }
        await this._db.one<{ result: number }>(updateScoresQuery, {
            matchId: id,
            redScore,
            blueScore,
        });
        return 0;
    }
}
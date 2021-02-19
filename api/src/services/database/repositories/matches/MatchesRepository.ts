import { AppDatabase } from '../../database';
import { sql } from '../../util';
import { Match, MatchTeam, UpcomingMatch } from '../../../../models/Match';

const findAllQuery = sql('matches/findAll.sql');
const findOneQuery = sql('matches/findOne.sql');
const findMatchTeamsQuery = sql('matches/findMatchTeams.sql');
const findUpcoming = sql('matches/findUpcoming.sql');
const updateAttendanceQuery = sql('matches/updateTeamAttendance.sql');
const updateScoresQuery = sql('matches/updateScores.sql');
const findForTournamentQuery = sql('matches/findForTournament.sql');
const createMatchQuery = sql('matches/createMatch.sql');

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

    public async findTournamentMatches(tournId: string): Promise<Match[]> {
        return this._db.any(findForTournamentQuery, { tournId });
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

    public async findUpcomingMatches(tournId: string): Promise<UpcomingMatch[]> {
        return await this._db.any<UpcomingMatch>(findUpcoming, {
            tournId,
        });
    }

    public async createMatch(
        tournId: string,
        matchNum: number,
        matchTime: string,
        redTeams: string[],
        blueTeams: string[],
    ): Promise<any> {
        await this._db.one(createMatchQuery, {
            tournId,
            matchNum,
            matchTime,
            redTeam1: redTeams[0],
            redTeam2: redTeams[1],
            blueTeam1: blueTeams[0],
            blueTeam2: blueTeams[1],
        });
    }
}
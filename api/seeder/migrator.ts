import { MockSchema } from '.';
import data from './seed.json';
import { db } from '../src/services/database/database';

let seedData: MockSchema = data as any;

(async () => {
    let { tournaments, judges, teams } = seedData;

    // Insert every team
    for(let t of teams) {
        let { team_name, team_number } = t;
        let tid = await db.teams.create(team_number, team_name);
        t.id = tid;
    }

    // First insert every tournament and store their IDs
    for(let t of tournaments) {
        let { name, date, location} = t;
        let tid = await db.tournaments.createTournament(name, date, location);
        t.id = tid;
        for(let teamNum of t.participatingTeams) {
            let team = teams.find(t => t.team_number === teamNum);
            await db.tournaments.registerTeam(team.id, tid);
        }
    }

    // insert all the judges
    for(let j of judges) {
        let { email, firstName, lastName, password } = j;
        await db.users.registerUser(email, password, firstName, lastName);
    }
})()
    .catch(e => {
        console.error(e);
    })
    .finally(() => {
        console.log("successfully inserted data");
        process.exit(0);
    });

import faker from "faker";

// Create 5 tournaments; 150 teams
// Mix teams so each tournament has 50 teams; some teams go to more than one
// Generate 2-3 judge accounts
// Denormalize data to json file for import

const NUM_TOURNS = 5;
const NUM_TEAMS = 150;

export interface Tournament {
  id?: string;
  name: string;
  date: string;
  location: string;
  participatingTeams: number[];
}

export interface Team {
  id?: string;
  team_number: number;
  team_name: string;
}

export interface Judge {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface MockSchema {
  tournaments: Tournament[];
  teams: Team[];
  judges: Judge[];
}

// add to participating teams later


function createPool(nums: number): () => number {
    let pool = [...Array(nums).keys()];
    return () => {
        if(pool.length === 0) {
            throw 'No numbers left';
        }
        let index = Math.floor(pool.length * Math.random());
        let drawn = pool.splice(index, 1);
        return drawn[0];
    }
}

export function generateTeams(num: number): Team[] {
    let teams: Team[] = [];
    let getNumber = createPool(10000);
    
    for (let i = 0; i < num; i++) {
        teams.push({
            team_name: `${faker.hacker.adjective()} ${faker.hacker.noun()}s`,
            team_number: getNumber(),
        });
    }

    return teams;
}

const teams = generateTeams(150);
const teamNums = teams.map(t => t.team_number);
export const data: MockSchema = {
    teams,
    tournaments: [
    {
      name: "Indy Tech Rush Challenge",
      date: new Date("2021-02-11").toString(),
      location: "Indianapolis",
      participatingTeams: faker.helpers.shuffle(teamNums).slice(100),
    },
    {
      name: "Big River Tech Bash",
      date: new Date("2021-02-12").toString(),
      location: "Chicago",
      participatingTeams: faker.helpers.shuffle(teamNums).slice(100),
    },
    {
      name: "Wabash Valley Tech Challenge",
      date: new Date("2021-02-13").toString(),
      location: "Terre Haute",
      participatingTeams: faker.helpers.shuffle(teamNums).slice(100),
    },
    {
      name: "Null Tournament",
      date: new Date("2021-02-19").toString(),
      location: "The Void",
      participatingTeams: faker.helpers.shuffle(teamNums).slice(100),
    },
  ],
  judges: [
      {
          firstName: "Mike",
          lastName: "Dummy",
          email: "mike@example.com",
          password: "password123",
      },
      {
          firstName: "Dike",
          lastName: "Mummy",
          email: "dike@example.com",
          password: "mikeyoudummy",
      },
      {
          firstName: "Zike",
          lastName: "Crummy",
          email: "zike@example.com",
          password: "zikerocks234",
      },
      {
          firstName: "Judge",
          lastName: "Judy",
          email: "judge@example.com",
          password: "immasueyou",
      }
  ],
};

console.log(JSON.stringify(data));
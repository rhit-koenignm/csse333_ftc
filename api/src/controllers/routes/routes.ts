/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MatchesController } from './../MatchesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TeamsController } from './../TeamsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TournamentsController } from './../TournamentsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../UserController';
import { iocContainer } from './../../container';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MatchTeam": {
        "dataType": "refObject",
        "properties": {
            "team_id": {"dataType":"string","required":true},
            "team_number": {"dataType":"string","required":true},
            "team_name": {"dataType":"string","required":true},
            "alliance_color": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Red"]},{"dataType":"enum","enums":["Blue"]}],"required":true},
            "attending": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Match": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "number": {"dataType":"double","required":true},
            "tournament_id": {"dataType":"string","required":true},
            "red_score": {"dataType":"double","required":true},
            "blue_score": {"dataType":"double","required":true},
            "scheduled_time": {"dataType":"string","required":true},
            "teams": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"array","array":{"ref":"MatchTeam"}}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllMatchesResponse": {
        "dataType": "refObject",
        "properties": {
            "matches": {"dataType":"array","array":{"ref":"Match"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetMatchResponse": {
        "dataType": "refObject",
        "properties": {
            "match": {"ref":"Match","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpcomingMatch": {
        "dataType": "refObject",
        "properties": {
            "match_name": {"dataType":"string","required":true},
            "blue_team_num_1": {"dataType":"double","required":true},
            "blue_team_num_2": {"dataType":"double","required":true},
            "red_team_num_1": {"dataType":"double","required":true},
            "red_team_num_2": {"dataType":"double","required":true},
            "match_time": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUpcomingMatchesResponse": {
        "dataType": "refObject",
        "properties": {
            "tournament_id": {"dataType":"string","required":true},
            "matches": {"dataType":"array","array":{"ref":"UpcomingMatch"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SaveMatchRequest": {
        "dataType": "refObject",
        "properties": {
            "matchId": {"dataType":"string","required":true},
            "redScore": {"dataType":"double","required":true},
            "blueScore": {"dataType":"double","required":true},
            "attendance": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"attendance":{"dataType":"boolean","required":true},"team_id":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Team": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "team_number": {"dataType":"double","required":true},
            "team_name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllTeamsResponse": {
        "dataType": "refObject",
        "properties": {
            "teams": {"dataType":"array","array":{"ref":"Team"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TeamRanking": {
        "dataType": "refObject",
        "properties": {
            "rank_num": {"dataType":"string","required":true},
            "participant_id": {"dataType":"string","required":true},
            "team_num": {"dataType":"double","required":true},
            "qp": {"dataType":"double","required":true},
            "rp": {"dataType":"double","required":true},
            "match_count": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRankingsResponse": {
        "dataType": "refObject",
        "properties": {
            "tournament_id": {"dataType":"string","required":true},
            "rankings": {"dataType":"array","array":{"ref":"TeamRanking"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tournament": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "date": {"dataType":"string","required":true},
            "location": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllTournamentsResponse": {
        "dataType": "refObject",
        "properties": {
            "tournaments": {"dataType":"array","array":{"ref":"Tournament"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetOneTournamentResponse": {
        "dataType": "refObject",
        "properties": {
            "tournament": {"ref":"Tournament","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginResponse": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "errorMessage": {"dataType":"string"},
            "success": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterUserResponse": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "first_name": {"dataType":"string"},
            "last_name": {"dataType":"string"},
            "errorMessage": {"dataType":"string"},
            "success": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/matches',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<MatchesController>(MatchesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getAllMatches.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/matches/:matchId',
            function (request: any, response: any, next: any) {
            const args = {
                    matchId: {"in":"path","name":"matchId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<MatchesController>(MatchesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getMatch.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/matches/upcoming/:tournId',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<MatchesController>(MatchesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getUpcomingMatches.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/matches/tournament/:tournId',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<MatchesController>(MatchesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getMatches.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/matches/:matchId',
            function (request: any, response: any, next: any) {
            const args = {
                    matchId: {"in":"path","name":"matchId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"SaveMatchRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<MatchesController>(MatchesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.updateMatchDetails.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/teams',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TeamsController>(TeamsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getAllTeams.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/teams/rankings/:tournId',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TeamsController>(TeamsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getTournamentRankings.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/teams/:teamId',
            function (request: any, response: any, next: any) {
            const args = {
                    teamId: {"in":"path","name":"teamId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TeamsController>(TeamsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.updateTeam.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tournaments',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TournamentsController>(TournamentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getAllTournaments.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tournaments/:tournId/teams',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TournamentsController>(TournamentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getTournamentTeams.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tournaments/:tournId',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TournamentsController>(TournamentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getTournament.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tournaments/:tournId/genMatches',
            function (request: any, response: any, next: any) {
            const args = {
                    tournId: {"in":"path","name":"tournId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<TournamentsController>(TournamentsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.generateTournamentMatches.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/login',
            function (request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.userLogin.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/register',
            function (request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

            const controller: any = container.get<UserController>(UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.registerUser.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus();
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data || data === false) { // === false allows boolean result
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }
    
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

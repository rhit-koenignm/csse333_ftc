import { RouteConfig } from 'react-router-config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeamsPage from './pages/TeamsPage';
import RankingsPage from './pages/RankingsPage';
import MatchesPage from './pages/MatchesPage';
import MatchOverviewPage from './pages/MatchOverviewPage';
import SelectTournamentPage from './pages/SelectTounamentPage';

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
    },
    {
        path: '/teams',
        exact: true,
        component: TeamsPage,
    },
    {
        path: '/rankings',
        exact: true,
        component: RankingsPage
    },
    {
        path: '/matches',
        exact: true,
        component: MatchesPage
    },
    {
        path: '/matches/:matchId',
        exact: true,
        component: MatchOverviewPage,
    },
    {
        path: '/selectTournament',
        exact: true,
        component: SelectTournamentPage,
    }
    /*
    {
        component: NotFoundPage
    }
    */
];

export default routes;
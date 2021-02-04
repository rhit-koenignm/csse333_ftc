import { RouteConfig } from 'react-router-config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeamsPage from './pages/TeamsPage';
import RankingsPage from './pages/RankingsPage';
import MatchesPage from './pages/MatchesPage';

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
    }
    /*
    {
        component: NotFoundPage
    }
    */
];

export default routes;
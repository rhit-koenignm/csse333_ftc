import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeamsPage from './pages/TeamsPage';
import RankingsPage from './pages/RankingsPage';
import MatchesPage from './pages/MatchesPage';
import MatchOverviewPage from './pages/MatchOverviewPage';
import SelectTournamentPage from './pages/SelectTounamentPage';
import { Redirect } from 'react-router';
import { AuthService } from './services/auth';

const protectRoute = (Component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType): (props: RouteConfigComponentProps<any>) => React.ReactNode => {
    return props => {
        if(!AuthService.isUserLoggedIn()) {
            return <Redirect to="/login" />;
        }
        else return <Component {...props} />
    }
}

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        render: protectRoute(HomePage), 
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
    },
    {
        path: '/teams',
        exact: true,
        render: protectRoute(TeamsPage),
    },
    {
        path: '/rankings',
        exact: true,
        render: protectRoute(RankingsPage),
    },
    {
        path: '/matches',
        exact: true,
        render: protectRoute(MatchesPage),
    },
    {
        path: '/matches/:matchId',
        exact: true,
        render: protectRoute(MatchOverviewPage),
    },
    {
        path: '/selectTournament',
        exact: true,
        render: protectRoute(SelectTournamentPage),
    }
    /*
    {
        component: NotFoundPage
    }
    */
];

export default routes;
import * as React from 'react';
import { RouteConfig } from 'react-router-config';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TeamsPage from './pages/TeamsPage'

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
        component: TeamsPage
    }
    /*
    {
        component: NotFoundPage
    }
    */
];

export default routes;
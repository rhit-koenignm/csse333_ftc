require('./register');

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import container from './container';
import { applyControllerRoutes } from './controllers';

const app = express();
app.disable('x-powered-by');

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || 'localhost';
const appUrl = process.env.APP_URL || `${host}:${port}`;

app.use(cors());
app.use(bodyParser.json());

applyControllerRoutes(app, container);

app.listen(port, () => {
    console.log(`Server started at ${appUrl}`);
});

export default app;
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './routes/auth.router';
import ClassRoomRouter from './routes/classroom.router';
import { config } from 'dotenv';
import { authorizeRequest } from './middlewares/auth.middleware';

config();   // Load config like secrets etc in process.env to be accessible everywhere

process.on('uncaughtException', (error) => {
    console.error('[GLOBAL] uncaught exception', error);
});

process.on('unhandledRejection', (error) => {
    console.error('[GLOBAL] unhandled rejection', error);
});

const app = express();
const port = process.env.PORT || 3000;

// Add middlewares
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Working!');
});

// Define all the routes here and attach the routers.
const allRoutes = [
    {
        path: "/auth",
        router: AuthRouter
    },
    {
        path: "/classroom",
        router: ClassRoomRouter
    }
];

// Attaching all the defined routes to the server
allRoutes.forEach(route => {
    app.use(route.path, route.router);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
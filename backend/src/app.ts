import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {sequelize} from './config/database';
import './models/dial.model'
import {Dial} from "./models/dial.model";
import router from "./routes";
import bodyParser from 'body-parser';
import cors from 'cors';
import {User} from "./models/user.model";
import {conditionalSessionMiddleWare} from "./middleware/session.middleware";

const app = express();


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
sequelize.sync({alter: true});
Dial.initModel(sequelize)
User.initModel(sequelize)
const __dirname = path.resolve();
app.use(bodyParser.json({
    verify: (req: any, res, buf) => {
        req.rawBody = buf;
    }
}));
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
declare module 'express-session' {
    interface SessionData {
        userId: string;
        destroy: () => void;
    }
}
app.use(conditionalSessionMiddleWare);
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

export default app;
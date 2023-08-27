import router from '@/routes';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app: Express = express();

const corsOptions = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200,
	credentials: true
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded (forms)
app.use(express.json()); // for application/json
app.use(router);

export default app;

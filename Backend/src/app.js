import express, { urlencoded } from 'express';
import 'dotenv/config'
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import appRouter from './routes/appRouter.js';
import morgan from 'morgan'

const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors({credentials:true}));
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/v1',appRouter)

export default app;
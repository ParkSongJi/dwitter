import express from "express";
import morgan from "morgan";
import cors from 'cors';
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import {config} from './config.js';

import {initSocket} from './connection/socket.js'

console.log(process.env.JWT_SECRET);
const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);
// 라우터

app.use((req, res, next) => {
    res.sendStatus(404);
});

const server = app.listen(config.host.port);
initSocket(server);
import express from "express";
import morgan from "morgan";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use('/tweets', tweetsRouter, authRouter);
// 라우터

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(8080);
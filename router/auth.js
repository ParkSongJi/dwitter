/*
    회원가입
    router.post('/singup', ...)

    로그인
    router.post('/login', ...) -> 데이터가 있나없나 확인
    id, password비교 

    JWT 확인
    router.get('/me', ...) -> expires ,만료날짜
*/

import express from "express";
import * as tweetController from '../controller/tweet.js';


const router = express.Router();

// 회원가입
router.post('/signup', tweetController.signupTweet);

// 정보확인
router.post('/login',tweetController.loginTweet);

export default router;
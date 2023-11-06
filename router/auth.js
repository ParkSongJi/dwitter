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
import * as authController from '../controller/auth.js';
import {body} from 'express-validator';
import {validate} from '../middleware/validator.js';
import {isAuth} from '../middleware/auth.js';


const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username은 반드시 입력해야합니다!'),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage('password는 반드시 4자 이상이어야 합니다!'),
    validate
]

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name은 반드시 입력해야 합니다!'),
    body('email').isEmail().withMessage('email 형식 확인'),
    body('url').isURL().withMessage('URL 형식 확인')
        .optional({nullable: true, checkFalsy: true}),
    validate
]

// 회원가입
router.post('/signup', validateSignup, authController.signup);

// 정보확인
router.post('/login',validateCredential, authController.login);

// 확인
router.get('/me', isAuth, authController.me);

export default router;
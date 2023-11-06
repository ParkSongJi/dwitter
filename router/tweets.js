import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body} from 'express-validator';
import { validate } from "../middleware/validator.js";
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

/*

    POST, PUT에 text에 빈문자열을 없애고, 3자이상 입력해야 저장되도록 API에 적용

*/
const validateTweet = [
    body('text').trim().isLength({ min: 3 }).withMessage('최소 3자이상 입력해야합니다!'), validate
];


// GET / tweets
// GET / tweets?username=:username
// GET / tweets/:id

// Post / tweets
// PUT / tweets/:id
//DELETE / tweets/:id


// GET 불러오기
// GET / tweets?username=:username username으로 불러오기
// router
//     .get('/', (req, res, next) => {
//         const username = req.query.username;
//         const data = username 
//         ? tweets.filter((tweet) => tweet.username === username)
//         : tweets;
//         res.status(200).json(data);
//     });

// 위에거를 간단하게↓
router.get('/', isAuth, tweetController.getTweets);

// GET / tweets/:id id로 불러오기
// router
//     .get('/:id', (req, res, next) =>{
//         const id = req.params.id;
//         const tweet = tweets.find((tweet) => tweet.id === id);
//         if(tweet) {
//             res.status(200).json(tweet);
//         }else{
//             res.status(404).json({message: `Tweet id(${id}) not found`});
//         }
//     });
// 위에거를 간단하게↓
router.get('/:id', isAuth, tweetController.getTweet);



// Post / tweets    등록하기
// router
//     .post('/', (req, res, next) => {
//         const {text, name, username} = req.body;
//         const tweet = {
//             id: '10',
//             text,       //text: text 와 같은말
//             createdAt: Date.now().toString(),
//             name,       //name: name 과 같은말
//             username    //username: username과 같은말
//         };
//         tweets = [tweet, ...tweets];
//         res.status(201).json(tweets);
//     });
// 위에거를 간단하게↓
// router.post('/', tweetController.createTweet);

router.post('/', isAuth, validateTweet, tweetController.createTweet);



// PUT / tweets/:id 수정하기
// router
//     .put('/:id', (req, res, next) =>{
//         const id = req.params.id;
//         const text = req.body.text;
//         const tweet = tweets.find((tweet) => tweet.id === id);
//         if(tweet) {
//             tweet.text = text;
//             res.status(200).json(tweet);
//         }else{
//             res.status(404).json({message: `Tweet id(${id}) not found`});
//         }
//     });
// 위에거를 간단하게↓
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);





//DELETE / tweets/:id 삭제하기
// router
//     .delete('/:id', (req, res, next) =>{
//         const id = req.params.id;
//         tweets = tweets.filter((tweet) => tweet.id !== id);
//         res.sendStatus(204);
//     });
// 위에거를 간단하게↓
router.delete('/:id', isAuth, tweetController.deleteTweet);




export default router;
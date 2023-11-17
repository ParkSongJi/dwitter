// import * as userRepository from './auth.js';
// import {db} from '../db/database.js';
import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';
import * as UserRepository from './auth.js';

const tweetSchema = new Mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String
    },
    { timestamps: true} 
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username){
    return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
    return Tweet.findById(id);
}

export async function create(text, userId) {
    return UserRepository.findById(userId).then((user) =>
        new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }).save()
    );
}

export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, {text}, {
        returnDocument: "after"
    })
}

export async function remove(id) {
    return Tweet.findByIdAndDelete(id);
}

// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

// 단 트윗은 최근글이 제일 상단으로 올라오도록


// let tweets = [
//     {
//         id: "1",
//         text: "안녕하세요!",
//         createdAt: Date.now().toString(),
//         userId: '1'
//     },
//     {
//         id: "2",
//         text: "반갑습니다!",
//         createdAt: Date.now().toString(),
//         userId: '2'
//     }
// ];

// export async function getAll(){
//     // return Promise.all(
//     //     tweets.map(async (tweet) => {
//     //         const {username, name, url} = await userRepository.findById(tweet.userId);
//     //         return {... tweet, username, name, url};
//     //     })
//     // );
//     return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
// }

// export async function getAllByUsername(username){
//     // return getAll().then((tweets) =>
//     //     tweets.filter((tweet) => tweet.username === username));
//     return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);
// }

// export async function getById(id){
//     // const found = tweets.find((tweet) => tweet.id === id);
//     // if(!found){
//     //     return null;
//     // }
//     // const {username, name, url} = await userRepository.findById(found.userId);
//     // return{...found, username, name, url};
//     console.log(id,'get');
//     return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
//         .then((result) => result[0][0]);
// }



// // db랑 연결안된버전
// // export async function create(text, userId){
// //     const tweet = {
// //         id: '10',
// //         text,       //text: text 와 같은말
// //         createdAt: Date.now().toString(),
// //         userId
// //         // name,       //name: name 과 같은말
// //         // userame    //username: username과 같은말
// //     };
// //     tweets = [tweet, ...tweets];
// //     return getById(tweet.id);
// // }

// // db랑 연결버젼
// export async function create(text, userId){
//     return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId])
//         .then((result) => getById(result[0].insertId));
// }



// export async function update(id, text){
//     // const tweet = tweets.find((tweet) => tweet.id === id);
//     // if(tweet) {
//     //     tweet.text = text;
//     // }
//     // return getById(tweet.id);
//     return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
// }

// export async function remove(id){
//     // tweets = tweets.filter((tweet) => tweet.id !== id);
//     return db.execute('DELETE FROM tweets WHERE id=?', [id]);
// }

// import * as userRepository from './auth.js';
// import {db} from '../db/database.js';
import SQ from "sequelize";
import { sequelize } from '../db/database.js';
import { User } from "./auth.js";


const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define(
    "tweet",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);
Tweet.belongsTo(User);   // user에있는 increment가 pk가 됨


// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

const INCLUDE_USER = {
    attributes: [
        "id", "text", "createdAt", "userId", 
            [Sequelize.col("user.name"), "name"], 
            [Sequelize.col("user.username"), "username"], 
            [Sequelize.col("user.url"), "url"],
            // 조인 시 객체를 생성하기 때문에 하위레벨에서 가져오기 위해 Sequlize.col로 가져와야 한다.
    ],
    include: {
        model: User,
        attributes: []
    }
}


const ORDER_DESC = {
    order: [["createdAt", "DESC"]]
}


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


export async function getAll(){
    return Tweet.findAll({ ... INCLUDE_USER, ...ORDER_DESC });
}


// export async function getAllByUsername(username){
//     // return getAll().then((tweets) =>
//     //     tweets.filter((tweet) => tweet.username === username));
//     return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);
// }

export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, ...ORDER_DESC, include: {
            ...INCLUDE_USER.include, where: { username }    // where username이 같은거
        }
    })
}

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



export async function getById(id){
    return Tweet.findOne({ where: { id }, ...INCLUDE_USER });
}



// db랑 연결안된버전
// export async function create(text, userId){
//     const tweet = {
//         id: '10',
//         text,       //text: text 와 같은말
//         createdAt: Date.now().toString(),
//         userId
//         // name,       //name: name 과 같은말
//         // userame    //username: username과 같은말
//     };
//     tweets = [tweet, ...tweets];
//     return getById(tweet.id);
// }




// db랑 연결버젼
// export async function create(text, userId){
//     return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId])
//         .then((result) => getById(result[0].insertId));
// }
export async function create(text, userId){
    return Tweet.create({ text, userId })
        .then((data) => this.getById(data.dataValues.id));
}


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


export async function update(id, text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    })
}

export async function remove(id){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.destroy();
    });
}

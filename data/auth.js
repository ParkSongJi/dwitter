// import bcrypt from "bcrypt";
// import {db} from '../db/database.js'

import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    url: String
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);     //modle:컬렉션 생성, 자동으로 s 붙음

export async function findByUsername(username){
    return User.findOne({ username });
}

export async function findById(id){
    return User.findById(id);   // 위에 있는 findById랑 다른거
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);   
}



// let users = [
//     {
//         id: '1',
//         username: 'apple',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '김사과',
//         email: 'apple@apple.com',
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
//     },
//     {
//         id: '2',
//         username: 'banana',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '반하나',
//         email: 'banana@banana.com',
//         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
//     }
// ]

// export async function signup(id, username, password, name, email)
// {
//     const user = {
//         id,
//         username,       
//         password,
//         name,
//         email
//     };
//     users = [user, ...users];
//     return users;
// }

// export async function login(id, password){
//     const hashed = bcrypt.hashSync(password, 10)
//     const result = bcrypt.compareSync(password, hashed)
//     return users.find((user) => user.id === id && result === true);
// }

// export async function getuser(id, password){
//     return users.find((user) => user.id === id && user.password === password);
// }


// export async function findByUsername(username){
//     // return users.find((user) => user.username == username);
//     return db.execute(`SELECT * FROM users WHERE username=?`,[username]).then((result) => result[0][0]);
// }

// export async function findById(id){
//     // return users.find((user) => user.id === id);
//     return db.execute(`SELECT * FROM users WHERE id=?`,[id]).then((result) => result[0][0]);
// }

// export async function createUser(user){
//     // const created = { ... user, id: '10'};
//     const {username, password, name, email, url} = user;
//     // users.push(created);
//     return db.execute('INSERT INTO USERS (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId);
//     // return created.id;
// }
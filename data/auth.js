// import bcrypt from "bcrypt";
// import {db} from '../db/database.js'
import SQ from  'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(   // 없으면 만들어지고 기존 테이블이 있으면 들어가진다
    'user', //테이블 이름(자동으로 users라고 바뀐다)
    {
        id:{
            type: DataTypes.INTEGER,        // 필드정의
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    {timestamps: false}
)




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

export async function findByUsername(username){
    return User.findOne({where: {username}});
}





// export async function findById(id){
//     // return users.find((user) => user.id === id);
//     return db.execute(`SELECT * FROM users WHERE id=?`,[id]).then((result) => result[0][0]);
// }

export async function findById(id){
    return User.findByPk(id);
}



// export async function createUser(user){
//     // const created = { ... user, id: '10'};
//     const {username, password, name, email, url} = user;
//     // users.push(created);
//     return db.execute('INSERT INTO USERS (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId);
//     // return created.id;
// }

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id);
}
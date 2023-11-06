import bcrypt from "bcrypt";

let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '김사과',
        email: 'apple@apple.com',
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '반하나',
        email: 'banana@banana.com',
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYEhHx-OXQF1NqVRXPL8R50ggKje3hQTvIA&usqp=CAU"
    }
]

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

export async function findByUsername(username){
    return users.find((user) => user.username == username);
}

export async function findById(id){
    return users.find((user) => user.id === id);
}

export async function createUser(user){
    const created = { ... user, id: '10'};
    users.push(created);
    return created.id;
}
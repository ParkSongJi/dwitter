import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res){
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

// router
//     .get('/', (req, res, next) => {
//         const username = req.query.username;
//         const data = username 
//         ? tweets.filter((tweet) => tweet.username === username)
//         : tweets;
//         res.status(200).json(data);
//     });


// getTweet
export async function getTweet(req, res, next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(400).json({message: `Tweet id(${id}) not found`});
    }
}

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


// createTweet
export async function createTweet(req, res, next){
    const {text, name, username} = req.body;
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
}
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



// updateTweet
export async function updateTweet(req, res, next){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
}

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




// deleteTweet
export async function deleteTweet(req, res, next){
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}

// router
//     .delete('/:id', (req, res, next) =>{
//         const id = req.params.id;
//         tweets = tweets.filter((tweet) => tweet.id !== id);
//         res.sendStatus(204);
//     });
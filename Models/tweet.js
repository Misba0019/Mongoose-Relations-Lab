const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mongoRelationsDB')
    .then(() => {
        console.log('MongoDB connected!')
    })
    .catch(err => {
        console.log("Error connecting to MongoDB: ");
        console.log(err);
    })

// User schema: author of tweets
const userSchema = new Schema({
    username: String,
    age: Number
})

// Tweet schema: references a User document
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
});

const Tweet = mongoose.model('Tweet', tweetSchema);
const User = mongoose.model('User', userSchema);

// Demo: Create a new tweet and associate it with a user
const makeTweet = async() => {
    const author = new User({ username: 'user123', age: 23 });
    await author.save();

    const tweet  = new Tweet({
        text: "Said no more couting dollars, we'll be couting stars.",
        likes: 123
    });
    tweet.user = author;
    // Associate the tweet with the author's ObjectId
    await tweet.save();
    console.log('Created Tweet:', tweet);
}

// Demo: Find tweet and populate user data
const findTweet = async() => {
    const tweet = await Tweet.findOne({}).populate('user');
    console.log('Populated Tweet:',tweet);
}

// Demo runner
const runDemo = async() => {
    // await makeTweet();
    await findTweet();
}
runDemo();

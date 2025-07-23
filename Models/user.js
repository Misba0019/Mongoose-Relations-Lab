const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongoRelationsDB')
    .then(() => {
        console.log('MongoDB connected...')
    })
    .catch(err => {
        console.log("Error connecting to MongoDB: ");
        console.log(err);
    })

// User Schema with embedded address documents
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String,
            _id: false // Prevent Mongoose from adding _id to subdocuments
        }
    ]
});

const User = mongoose.model('User', userSchema);

// Demo: Create a user with an embedded address
const makeUser = async() => {
    const user = new User({
        first: 'Collin',
        last: 'James'
    })

    user.addresses.push({
        street: 'Church St',
        city: 'London',
        state: 'England',
        country: 'UK'
    })

    const res = await user.save();
    console.log('Created User:', res);
}

// Demo: Add a second address to an existing user
const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '456 Elm St',
        city: 'Chicago',
        state: 'IL',
        country: 'USA'
    })
    const res = await user.save()
    console.log('Updated user with new address:', res);
}

// Demo runner
const runDemo = async() => {
    await makeUser();
    // await addAddress('68122446f03153b030ecfe89'); // Replace with actual user ID
}
runDemo();

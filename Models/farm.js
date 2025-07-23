const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myFarmDB')
    .then(() => {
        console.log('MongoDB connected!')
    })
    .catch(err => {
        console.log("Error connecting to MongoDB: ");
        console.log(err);
    })

// Product schema: referenced in Farm schema
const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

// Farm schema: references multiple Products documents
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Demo: Create a farm and associate it with a product
const makeFarm = async() =>{
    const farm = new Farm({
    name: 'Harvey Farms',
    city: 'Guinda, CA'
    });
    const melon = await Product.findOne({ name: 'Water Melon' });
    farm.products.push(melon)
    await farm.save();
    console.log('Created Farm:',farm);
}

// Demo: Add a product to an existing farm
const addProduct = async() => {
    const farm = await Farm.findOne({ name: 'Harvey Farms' });
    const strawberry = await Product.findOne({ name: 'Strawberry' });
    farm.products.push(strawberry);
    await farm.save();
    console.log(farm);
}

// Demo: Find and populate farm products
const showPopulatedFarm = async () => {
    const farm = await Farm.findOne({ name: 'Harvey Farms' }).populate('products');
    console.log('Populated Farm:', farm);
};

// Demo runner
const runDemo = async() => {
    await makeFarm(); // Run this only once, or it creates duplicates
    await addProduct(); // Adds a new product to existing farm
    await showPopulatedFarm(); // View farm with populated product details
}
runDemo();

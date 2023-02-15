const { default: mongoose } = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price_val = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "63e808af1b00ece84d9bb4f3",
            location: `${cities[random1000].city}, ${cities[random1000].state }`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/dfhk2kifs/image/upload/v1676323525/YelpCamp/pncmgv7s0zpkhe8oyuam.jpg',
                    filename: 'YelpCamp/pncmgv7s0zpkhe8oyuam'
                },
                {
                    url: 'https://res.cloudinary.com/dfhk2kifs/image/upload/v1676323342/YelpCamp/gozvkfox0zfb0k14zdon.jpg',
                    filename: 'YalpCamp/gozvkfox0zfb0k14zdon'
                }
            ],
            description: "A nice place to view!!!!",
            price: price_val
        })
        await camp.save();
    }


}

seedDB().then(() => {
    mongoose.connection.close();
});
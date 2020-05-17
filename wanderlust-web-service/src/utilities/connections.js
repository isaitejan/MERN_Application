const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/Wanderlust_DB";

let userSchema = Schema({
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String]
}, { collection: "User" })

let packageSchema = Schema({
    bookingId: String,
    userId: String,
    destId: String,
    destinationName: String,
    checkInDate: Date,
    checkOutDate: Date,
    noOfPersons: Number,
    totalCharges: Number,
    timeStamp: String
},{ collection : "Packages"})

let destinationSchema = Schema({
    destinationId : String,
    continent : String,
    name : String,
    imageUrl : String,
    details : {
        about : String,
        itinerary : {
            dayWiseDetails : {
                firstDay : String,
                restDaysSightSeeing : Array,
                lastDay : String
            },
            packageInclusions : Array,
            tourHighlights : Array,
            tourPace : Array
        }
    },
    noOfNights : Number,
    flightCharges : Number,
    chargesPerPerson : Number,
    discount : Number,
    availability : Number
},{ collection : 'Destinations'})

let hotdealSchema = Schema({
    destinationId : String,
    continent : String,
    name : String,
    imageUrl : String,
    details : {
        about : String,
        itinerary : {
            dayWiseDetails : {
                firstDay : String,
                restDaysSightSeeing : Array,
                lastDay : String
            },
            packageInclusions : Array,
            tourHighlights : Array,
            tourPace : Array
        }
    },
    noOfNights : Number,
    flightCharges : Number,
    chargesPerPerson : Number,
    discount : Number,
    availability : Number
},{ collection : 'Hotdeals'})

let bookSchema = Schema({
    bookingId : String,
    noOfPersons : Number,
    date : Date,
    totalCharges : Number
},{collection:'BookingsInit'})

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology:true}).then((database) => {
        return database.model('User', userSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getPackageCollection = () =>{
    return Mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology:true}).then((database) => {
        return database.model('Packages', packageSchema)
    })
    .catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getDestinationCollection = () =>{
    return Mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology:true}).then((database) => {
        return database.model('Destinations', destinationSchema)
    })
    .catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getHotdealsCollection = ()=>{
    return Mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology:true}).then((database) => {
        return database.model('Hotdeals', hotdealSchema)
    })
    .catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getBookingsCollection = ()=>{
    return Mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology:true}).then((database) =>{
        return database.model('BookingsInit', bookSchema)
    })
    .catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;

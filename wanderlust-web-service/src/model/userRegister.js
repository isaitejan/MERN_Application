const userDetails = require('./beanClasses/users');
const connection = require("../utilities/connections");

const registerDB = {};

registerDB.registerUser = (dataToInsert)=>{
    return connection.getUserCollection().then((collection)=>{
        return collection.create(dataToInsert).then((result)=>{
            return result;
        })
    })
    
}

module.exports = registerDB;
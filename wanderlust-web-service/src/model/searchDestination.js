const connection = require("../utilities/connections");

exports.searchDestination = (continent)=>{
    return connection.getDestinationCollection().then((database)=>{
        return database.find({"continent": continent}).then((data)=>{
            if (data.length !== 0){
                return data;
            }else{
                throw new Error("No Data Found!")
            }
        })
    })
}
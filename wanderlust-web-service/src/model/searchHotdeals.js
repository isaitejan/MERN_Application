const connection = require("../utilities/connections");

exports.searchHotdeals = ()=>{
    return connection.getHotdealsCollection().then((database)=>{
        return database.find({}).then((data)=>{
            if (data.length !== 0){
                return data;
            }else{
                throw new Error("No Data Found!")
            }
        })
    })
}
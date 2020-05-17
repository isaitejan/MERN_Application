const connection = require("../utilities/connections");

exports.enterBookings = (bookDetails)=>{
    return connection.getBookingsCollection().then((db)=>{
        return db.create(bookDetails).then((data)=>{
            if(data){
                // console.log(data)
                return "Data Inserted"
            }else{
                throw new Error("Cant Insert Data!")
            }
        })
    })
}
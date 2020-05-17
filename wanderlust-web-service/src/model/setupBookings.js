const connection = require('../utilities/connections');

let BookData = [{ bookingId : "B1001" , noOfPersons : 2 , date : 17-05-2020 , totalCharges : 1234},{  bookingId : "B1002" , noOfPersons : 3 , date : 18-05-2020 , totalCharges : 1432}];

exports.bookingSetup = () =>{
    return connection.getBookingsCollection().then((myCollection)=>{
        return myCollection.deleteMany().then((data)=>{
            return myCollection.insertMany(BookData).then((data)=>{
                if (data){
                    return "Insertion Successfull"
                }else{
                    throw new Error("Insertion Failed!")
                }
            })
        })
    })
}
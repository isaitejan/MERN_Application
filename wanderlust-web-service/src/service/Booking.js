const bookingService = require('../model/Bookings');
const connection = require('../utilities/connections');

const services = {}

services.insertBooking = (data)=>{
    return bookingService.enterBookings(data).then((opdata)=>{
        // console.log(opdata)
        return opdata;
    })
}

services.getBookingId = ()=>{
    return connection.getBookingsCollection().then((model)=>{
        return model.distinct("bookingId").then((ids)=>{
            let arrId = ids.map((each)=>{
                return parseInt(each.substring(1))
            })
            // console.log(arrId);
            let newId = Math.max(...arrId);
            newId = newId + 1;
            let ret = "B"+String(newId);
            return ret;
        })
})
}

module.exports = services;
const express = require('express');
const router = express.Router();
const services = require('../service/Booking');
const bookingSetup = require('../model/setupBookings');

router.post('/booking',(req, res, next)=>{
    services.getBookingId().then((id)=>{
        let bookDetails1 = {}
        bookDetails1.bookingId = id;
        bookDetails1.noOfPersons = req.body.noOfPersons;
        bookDetails1.date = req.body.date;
        bookDetails1.totalCharges = req.body.totalCharges;
        // console.log("After first service")
        services.insertBooking(bookDetails1).then((data1)=>{
            // console.log(data1);
            res.json(data1);
        })
    })
    .catch(err => next(err))
})

router.get('/setupBooking',(req, res, next)=>{
    bookingSetup.bookingSetup().then((data)=>{
        res.send(data);
    }).catch(err => next(err))
})

module.exports = router;

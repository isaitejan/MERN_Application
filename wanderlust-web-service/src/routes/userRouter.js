const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')
const userRegister = require('../service/userRegister')

router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})

//router to login
router.post('/login', function (req, res, next) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login(parseInt(contactNo), password).then(function (userDetails) {
        res.json(userDetails);
    }).catch(err => next(err));
})

//router to register
router.post('/register', function (req, res, next) {
    // console.log("start");
    let userId = userRegister.generateUID().then((uId)=>{
        let userId = uId;
        let name = req.body.name;
        let emailId = req.body.emailId;
        let contactNo = parseInt(req.body.contactNo);
        let password = req.body.password;
        let bookings = [];
        let regData = { userId : userId, name : name, emailId : emailId, contactNo : contactNo, password : password, bookings : bookings};
        // console.log(regData);
        userRegister.checkPhone(contactNo).then((resp)=>{
            if ( resp === null){
                userRegister.registerUser(regData).then((output)=>{
                    res.json(output)
                })
            }else{
                res.send("Data cant be inserted")
            }
        })
        .catch(err => next(err))
        // console.log(userId);
    })
})

module.exports = router;


const express = require('express');
const router = express.Router();
const setupPackage = require('../model/setupPackage');
const setupDestinations = require('../model/setupDestinations');
const setupHotdeals = require('../model/setupHotDeals');
const searchDestination = require('../model/searchDestination');
const searchHotdeals = require('../model/searchHotdeals');

router.get('/setupPackage', (req , res , next)=>{
    setupPackage.packageSetup().then((data)=>{
        res.send(data);
    }).catch(err => next(err))
})

router.get('/setupDestinations', (req , res, next)=>{
    setupDestinations.destinationSetup().then((data)=>{
        res.send(data);
    }).catch(err => next(err))
})

router.get('/setupHotdeals', (req, res, next)=>{
    setupHotdeals.hotdealSetup().then((data)=>{
        res.send(data);
    }).catch(err => next(err))
})

router.get('/destinations/:continent',(req , res , next)=>{
    searchDestination.searchDestination(req.params.continent).then((data)=>{
        res.send(data);
    }).catch(err => next(err))
})

router.get('/hotDeals/', (req, res, next)=>{
    searchHotdeals.searchHotdeals().then((data)=>{
        res.send(data)
    }).catch(err => next(err))
})

module.exports = router;
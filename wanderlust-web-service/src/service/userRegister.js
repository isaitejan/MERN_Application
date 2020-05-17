const userDB = require('../model/userslogin');
const registerDB = require('../model/userRegister');
const connection = require("../utilities/connections");

const userRegister = {};

userRegister.generateUID = ()=>{
    return connection.getUserCollection().then((model)=>{
        return model.distinct("userId").then((ids)=>{
            let arrId = ids.map((each)=>{
                return parseInt(each.substring(1))
            })
            // console.log(arrId);
            let newId = Math.max(...arrId);
            newId = newId + 1;
            let ret = "U"+String(newId);
            return ret;
        })
    })

}

userRegister.checkPhone = (phn)=>{
    return connection.getUserCollection().then((model)=>{
        return model.findOne({"contactNo":phn}).then((res)=>{
            console.log(res);
            return res;
        })
    })
}

userRegister.registerUser = (ipdata)=>{
    return registerDB.registerUser(ipdata).then((opdata)=>{
            return opdata;
    })    
}

module.exports = userRegister;
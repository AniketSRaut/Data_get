const express = require('express') 

const router = express.Router();
const crypto = require("crypto-js");

const db = require('../db')
const utils = require('../utils')


// Adding Customer { Create Operation }

router.post('/addCustomer',(req,res)=>{

    const {cusName , email ,password , address} = req.body

//    const encryptPassword = String( crypto.SHA256(password))

    const statement = `insert into Customer (cusName , email ,password , address ) values (?,?,?,?);`

    db.pool.execute(statement,[cusName , email ,password , address],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(result))
        }
    })
})




router.get('/getAllCustomer',(req,res)=>{

    // const {cuscusName , email ,password , address} = req.body

    const statement = `select cusName , email ,password , address from Customer;`

    db.pool.execute(statement,(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult(result))
        }
    })
})

// get Customer By Email  { For searching }
router.post('/getByEmail',(req,res)=>{

    const { email} = req.body

    const statement = `select cusName , email ,password , address from Customer where email = ?`

    db.pool.execute(statement,[email],(error,result)=>{
        if(error){
            res.send(utils.createErrorResult(error))
        }else{

            if(result.length == 0){
            res.send(utils.createErrorResult("Invalid Email ..."))

            }else{
                res.send(utils.createSuccessResult(result))
            }
        }
    })
})

module.exports = router
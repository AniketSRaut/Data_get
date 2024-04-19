const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// import that Customer Router file 
const cusRouter = require('./router/customer')



// middle ware used before every call every 

app.use('/customer',cusRouter)


app.listen(4000, '0.0.0.0',()=>{
    console.log('Server Started....')
})
require('dotenv').config()

const express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    productRoute = require('./routes/productRoute'),
    userRoute = require('./routes/userRoute'),
    authenticated = require('./middlewares/authenticated'),
    cartRoute = require('./routes/cartRoute')

mongoose.connect(`mongodb://localhost/e_commerce_${process.env.NODE_ENV}`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use(authenticated)
app.use('/products', productRoute)
app.use('/carts', cartRoute)

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app
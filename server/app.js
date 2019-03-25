require('dotenv').config()

const express = require('express'),
    app = express(),
    port = 3000,
    mongoose = require('mongoose'),
    cors = require('cors'),
    productRoute = require('./routes/productRoute'),
    userRoute = require('./routes/userRoute'),
    cartRoute = require('./routes/cartRoute')

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-s6ej4.gcp.mongodb.net/e_commerce_${process.env.NODE_ENV}?retryWrites=true`, { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/carts', cartRoute)

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app
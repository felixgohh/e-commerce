const chai = require('chai')
const chaiHtpp = require('chai-http')
const should = chai.should()
const app = require('../app')
const mongoose = require('mongoose')
var productId = ''
var tokenUser = ''
var userId = ''
var cartId = ''

chai.use(chaiHtpp)

after(function (done) {
    mongoose.connect(`mongodb://localhost/e_commerce_test`, { useNewUrlParser: true }, function () {
        mongoose.connection.db.dropDatabase();
        done()
    })

});


// C U S T O M E R  A U T H E N T I C A T I O N
describe('POST /users/signup', function () {
    it('should return an object and status 201', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "test123@mail.com",
                "password": "test123"
            })
            .then(response => {
                console.log(response.body, 'ini signup user');

                response.should.have.status(201)
                response.should.be.an('object')
                response.body.should.have.property('first_name')
                response.body.should.have.property('last_name')
                response.body.should.have.property('email')
                response.body.should.have.property('password')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})


describe('POST /users/signin', function () {
    it('should return an object and status 200', function (done) {
        chai
            .request(app)
            .post('/users/signin')
            .send({
                "email": "test123@mail.com",
                "password": "test123"
            })
            .then(response => {
                console.log(response.body, 'ini sign in user');

                response.should.have.status(200)
                response.body.should.be.an('object')
                response.body.should.have.property('userId')
                response.body.should.have.property('token')
                response.body.should.have.property('name')
                tokenUser = response.body.token
                userId = response.body.userId
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})
// C U S T O M E R  A U T H E N T I C A T I O N

// C R U D  P R O D U C T S
describe('/POST products', function () {
    it('should return an object and status 201', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "Test",
                "price": "20000"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini post products');

                response.should.have.status(201)
                response.body.should.be.an('object')
                response.body.should.have.property('_id')
                productId = response.body._id
                response.body.should.have.property('name')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/GET products', function () {
    it('should return an array and status 200', function (done) {
        chai
            .request(app)
            .get(`/products`)
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini get products');

                response.should.have.status(200)
                response.body.should.be.an('array')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/PUT products/:id', function () {
    it('should return an object and status 200', function (done) {
        chai
            .request(app)
            .put(`/products/${productId}`)
            .send({
                "name": "Update test",
                "price": "10000"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini put products');

                response.should.have.status(200)
                response.body.should.be.an('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('name')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

// C R U D  P R O D U C T S ( D E L E T E  P R O D U C T  B E L O W  D E L E T E  C A R T S )

// C R E A T E  A N D  D E L E T E  C A R T S
describe('POST /carts', function () {
    it('should return an object and status 201', function (done) {
        chai
            .request(app)
            .post(`/carts`)
            .send({
                "productId": productId,
                "userId": userId
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini post cart');
                response.should.have.status(201)
                response.should.be.an('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('productId')
                response.body.should.have.property('userId')
                cartId = response.body._id
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('DELETE /carts', function () {
    it('should return an object and status 200', function (done) {
        chai
            .request(app)
            .delete(`/carts/${cartId}`)
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini delete cart');
                response.should.have.status(200)
                response.should.be.an('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('productId')
                response.body.should.have.property('userId')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})
// C R E A T E  A N D  D E L E T E  C A R T S


describe('DELETE /products/:id', function () {
    it('should return an object and status 200', function (done) {
        chai
            .request(app)
            .delete(`/products/${productId}`)
            .set({
                access_token: tokenUser
            })
            .then(response => {
                console.log(response.body, 'ini delete products');

                response.should.have.status(200)
                response.body.should.be.an('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('name')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})
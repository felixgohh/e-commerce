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

/** D A T A B A S E  W I L L  B E  D R O P P E D  A F T E R  E V E R Y  T E S T */

after(function (done) {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-s6ej4.gcp.mongodb.net/e_commerce_${process.env.NODE_ENV}?retryWrites=true`, { useNewUrlParser: true },
        function () {
            mongoose.connection.db.dropDatabase();
            done()
        })
});


/** TO POST PRODUCT(EITHER SUCCESS CASE OR ERROR CASE), YOU NEED TO UN-COMMAND THE METHOD BUILT FOR TEST IN `productController.js` SO THE TEST WILL SUCCESS */

/**  S U C C E S S  T E S T  C A S E **/

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
                "password": "test123",
                "role": "user"
            })
            .then(response => {
                // console.log(response.body, 'ini signup user');

                response.should.have.status(201)
                response.should.be.an('object')
                response.body.should.have.property('first_name')
                response.body.should.have.property('last_name')
                response.body.should.have.property('email')
                response.body.should.have.property('password')
                response.body.should.have.property('role')

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
                // console.log(response.body, 'ini sign in user');

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
                "price": "20000",
                "stock": 1,
                "image": "should be link"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post products');

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
                // console.log(response.body, 'ini get products');

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
                "price": "10000",
                "stock": 10,
                "image": "should be link guys"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini put products');

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
                // console.log(response.body, 'ini post cart');
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
                // console.log(response.body, 'ini delete cart');
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
                // console.log(response.body, 'ini delete products');

                response.should.have.status(200)
                response.body.should.be.an('object')
                response.body.should.have.property('_id')
                response.body.should.have.property('name')
                response.body.should.have.property('price')
                response.body.should.have.property('image')
                response.body.should.have.property('stock')

                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})



/** E R R O R  T E S T  C A S E **/


// C U S T O M E R  A U T H E N T I C A T I O N

describe('POST /users/signup (if user sign up with an existing email)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "test123@mail.com",
                "password": "test123",
                "role": "user"
            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Email already exist')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an invalid email format)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "test123mail.com",
                "password": "test123",
                "role": "user"
            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Not a valid email format')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an empty first_name)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "",
                "last_name": "bar",
                "email": "test123mail.com",
                "password": "test123",
                "role": "user"
            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('First Name is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an empty last_name)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "",
                "email": "test123mail.com",
                "password": "test123",
                "role": "user"
            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Last Name is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an empty email)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "",
                "password": "test123",
                "role": "user"

            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Email is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an empty password)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "test123mail.com",
                "password": "",
                "role": "user"

            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Password is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signup (if user sign up with an empty role)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/users/signup')
            .send({
                "first_name": "foo",
                "last_name": "bar",
                "email": "test123mail.com",
                "password": "test123",
                "role": ""

            })
            .then(response => {
                // console.log(response.body, 'ini signup user ERROR');

                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.include('Role is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signin (if user sign in with a not registered email)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .post('/users/signin')
            .send({
                "email": "123@mail.com",
                "password": "test123"
            })
            .then(response => {
                // console.log(response.body, 'ini sign in user ERROR');

                response.should.have.status(401)
                response.body.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /users/signin (with wrong password)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .post('/users/signin')
            .send({
                "email": "123@mail.com",
                "password": "test1"
            })
            .then(response => {
                // console.log(response.body, 'ini sign in user ERROR');

                response.should.have.status(401)
                response.body.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})
// C U S T O M E R  A U T H E N T I C A T I O N

// C R E A T E  A N D  D E L E T E  C A R T S
describe('POST /carts (if user create cart without productId)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post(`/carts`)
            .send({
                "productId": "",
                "userId": userId
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post cart');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.property('_message')

                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /carts (if user create cart without userId)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post(`/carts`)
            .send({
                "productId": productId,
                "userId": ""
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post cart');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.property('_message')

                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('POST /carts (if user create cart with an invalid access_token)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .post(`/carts`)
            .send({
                "productId": productId,
                "userId": userId
            })
            .set({
                access_token: 'invalidtoken'
            })
            .then(response => {
                // console.log(response.body, 'ini post cart');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')

                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('DELETE /carts (if user delete carts with an invalid access_token)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .delete(`/carts/${cartId}`)
            .set({
                access_token: 'invalid token'
            })
            .then(response => {
                // console.log(response.body, 'ini delete cart');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')

                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

// C R U D  P R O D U C T S
describe('/POST products (if user create product with an invalid token)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "Test",
                "price": "20000",
                "stock": 1,
                "image": "should be link"
            })
            .set({
                access_token: 'invalidtoken'
            })
            .then(response => {
                // console.log(response.body, 'ini post products');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/GET products (if user get products with an invalid token)', function () {
    it('should return an array and status 401', function (done) {
        chai
            .request(app)
            .get(`/products`)
            .set({
                access_token: 'invalidtoken'
            })
            .then(response => {
                // console.log(response.body, 'ini get products');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/PUT products/:id (if user update a product with an invalid token)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .put(`/products/${productId}`)
            .send({
                "name": "Update test",
                "price": "10000",
                "stock": 1,
                "image": "should be link"
            })
            .set({
                access_token: 'invalidtoken'
            })
            .then(response => {
                // console.log(response.body, 'ini put products');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('DELETE /products/:id (if user delete a product with an invalid token)', function () {
    it('should return an object and status 401', function (done) {
        chai
            .request(app)
            .delete(`/products/${productId}`)
            .set({
                access_token: 'invalidtoken'
            })
            .then(response => {
                // console.log(response.body, 'ini delete products');
                response.should.have.status(401)
                response.should.be.an('object')
                response.body.should.have.property('message')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/POST products (if product name is empty)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "",
                "price": "20000",
                "stock": 1,
                "image": "should be link"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post products');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.include('Name is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/POST products (if product price is empty)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "Test",
                "price": "",
                "stock": 1,
                "image": "should be link"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post products');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.include('Price is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/POST products (if product image is empty)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "Test",
                "price": "2000",
                "stock": 1,
                "image": ""
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post products');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.include('Image is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})

describe('/POST products (if product stock is empty)', function () {
    it('should return an object and status 409', function (done) {
        chai
            .request(app)
            .post('/products')
            .send({
                "name": "Test",
                "price": "",
                "stock": "",
                "image": "should be link"
            })
            .set({
                access_token: tokenUser
            })
            .then(response => {
                // console.log(response.body, 'ini post products');
                response.should.have.status(409)
                response.should.be.an('object')
                response.body.should.have.include('Stock is required')
                done()
            })
            .catch(err => {
                console.log(err);

            })
    })
})
# E-Commerce
## URLs

Client URL : `http://localhost:8080`<br>
Server URL : `http://localhost:3000`

## Usage

Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a successful sign in action on the client-side.

Run `npm run start` to start the server.

## Routes

| Route           | HTTP       | Headers(s)                                           | Body                                                         | Description                   | Success Case                                                 | Error Case                           |
| --------------- | ---------- | ---------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| `/products`| **GET**| An Authenticated JWT Token| none| Get all product list| Show all the product list in `array of object` :<br> [{ _id: ObjectId,<br> name: String,<br> price: String,<br>image: String,<br>stock: Number}...]<br> with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/products`| **POST**| An Authenticated JWT Token,<br> An admin role | name: String(**Required**),<br>price: String(**Required**),<br>image: File(**Required**),<br>stock: Number(**Required**) | Create a new product | Show the created product in `object` :<br> { _id: ObjectId,<br> name: String,<br> price: String,<br>image: String,<br>stock: Number}<br> with status code 201 | Status code: 500 or 409, Error info in JSON |
| `/products/:id` | **GET** | An Authenticated JWT Token | none | Get a single product info | Show the product info in `object` :<br> { _id: ObjectId,<br> name: String,<br> price: String,<br>image: String,<br>stock: Number}<br> with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/products/:id` | **PUT** | An Authenticated JWT Token,<br> An admin role | name: String,<br>price: String,<br>image: File,<br>stock: Number | Update a product information | Show the updated product's info in `object` :<br> { _id: ObjectId,<br> name: String,<br> price: String,<br>image: String,<br>stock: Number} with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/products/:id` | **DELETE** | An Authenticated JWT Token,<br> An admin role  | none | Delete an product | Show the deleted product in `object` :<br> { _id: ObjectId,<br> name: String,<br> price: String,<br>image: String,<br>stock: Number} with status code 200 | Status code: 500 or 409, Error info in JSON |
| `/carts`| **POST**| An Authenticated JWT Token | productId: ObjectId(**Required**),<br>userId: ObjectId(**Required**),<br>status: (**Default: false**),<br>arrived:(**Default: false**)| Create a new cart | Show the created cart in `object` :<br> { _id: ObjectId,<br>productId: ObjectId,<br>userId: ObjectId,<br>status: false,<br>arrived: false }<br> with status code 201 | Status code: 500 or 409, Error info in JSON |
| `/carts/:id`| **DELETE**| An Authenticated JWT Token | none | Delete a cart | Show the deleted cart in `object` :<br> { _id: ObjectId,<br>productId: ObjectId,<br>userId: ObjectId,<br>status: false,<br>arrived: false } with status code 200 | Status code: 500, Error info in JSON |
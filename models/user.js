const mongoose = require('mongoose')
const Schema = mongoose.Schema

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        validate:[validateEmail, 'Not a valid email format']
    },
    password: String
})

UserSchema.pre('save', function (next) {
    User
        .findOne({ email: this.email })
        .then(data => {
            if (data) {
                throw new Error('email already exist')
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })

})

const User = mongoose.model('User', UserSchema)

module.exports = User
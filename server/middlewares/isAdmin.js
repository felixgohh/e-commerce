const userModel = require('../models/user')

module.exports = (req, res, next) => {
    let userId = req.headers.authorized

    userModel
        .findById(userId)
        .then(user => {
            if (user.role == 'admin') {
                next()
            } else {
                throw new Error('Not authorized to complete action')
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })

}
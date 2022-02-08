const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    address: {
            street: {type: String, required: true},
            suite: {type: String, required: true},
            city: {type: String, required: true},
            zipcode: {type: String, required: true},
            geo: {
                lat: {type: Number, required: true},
                lng: {type: Number, required: true},
            }
    },
    phone: {type: String, required: true},
    website: {type: String, required: true},
    company: {
        name: {type: String, required: true},
        catchPhrase: {type: String, required: true},
        bs: {type: String, required: true},
    }
})

module.exports = mongoose.model('User', UserSchema);
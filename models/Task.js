const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user_id: {type: Number, required: true},
    id: {type: Number, required: true},
    title: {type: String, required: true},
    completed: {type: Boolean, required: true},
})

module.exports = mongoose.model('Task', TaskSchema);
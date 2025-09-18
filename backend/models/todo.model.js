const { string } = require("joi");
const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        max: 150,
    },
    status: {
        type: String,
        enum: ['TODO','DONE'],
        default: 'TODO'
    },
    fileName: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('todo',todoSchema);

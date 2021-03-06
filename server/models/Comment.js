const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    body: {
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Notebook', 'Case', 'Cooler', 'Hdd', 'Memory', 'Monitor', 'Motherboard', 'Processor', 'Psu', 'Ssd', 'Vga']
    },
    createdAt: {
        type: String,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxlength: 50,
        required: true
    }
}, { timestamps: true });  // ✅ `createdAt` & `updatedAt` auto-generate

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

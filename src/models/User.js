const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { type: String, required: true },
    coins: { type: Number, default: 0 },
    daily: {
        streak: { type: Number, default: 0 },
        timestamp: Date,
    }
});

module.exports = model('User', userSchema);
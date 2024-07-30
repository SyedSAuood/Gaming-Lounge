const mongoose = require('mongoose');

const gamingAccountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userid:{ type: String, required: true},
    gameTitle: { type: String, require: true},
    accountLevel: { type: Number, require :true},
    platform: { type:String, require: true},
    inGameCurrency:{ type: Number, require: true},
    rareItems: { type: [String], required: true },
    description: { type: String, required: true },
    quantity: { type: Number, require: true},
    price: { type: Number, require :true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    approved: {
        type: Boolean,
        default: false // Default value is false (pending approval)
    }
})

const SellGamingAccount = mongoose.model('SellGamingAccount', gamingAccountSchema);

module.exports = SellGamingAccount;


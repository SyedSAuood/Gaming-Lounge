const mongoose = require('mongoose');

const buygamingAccountSchema = new mongoose.Schema({
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
    approved: {
        type: Boolean,
        default: false // Default value is false (pending approval)
    }
})

const BuyGamingAccount = mongoose.model('BuyGamingAccount', buygamingAccountSchema);

module.exports = BuyGamingAccount;
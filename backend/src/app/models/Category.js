const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'users',
        },
        cartItems: [
            {
                name: { type: String, require: true },
                image: { type: String, require: true },
                quantity: { type: Number, require: true },
                price: { type: Number, require: true },
                type: { type: String, require: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: 'products',
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('categories', Category);

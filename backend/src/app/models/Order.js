const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'users',
        },
        orderItems: [
            {
                name: { type: String, require: true },
                image: { type: String, require: true },
                quantity: { type: Number, require: true },
                price: { type: Number, require: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: 'products',
                },
            },
        ],
        totalPrice: { type: Number, require: true, default: 0.0 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('orders', Order);

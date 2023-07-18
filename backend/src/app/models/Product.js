const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, require: true },
        author: { type: String, require: true },
        image: { type: String, require: true },
        back_image: { type: String, require: true },
        description: { type: String, require: true },
        topic: { type: Array, require: true },
        type: { type: Array, require: true },
        book_cover: { type: String, require },
        price: { type: Number, require: true },
        sale: { type: Number, default: 0 },
        display: { type: Array },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('products', Product);

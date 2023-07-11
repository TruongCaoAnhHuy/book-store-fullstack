const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`${process.env.BOOK_API}/book-store`, { family: 4 });
        console.log('Connected');
    } catch (error) {
        console.log('Failed');
    }
}

module.exports = { connect };

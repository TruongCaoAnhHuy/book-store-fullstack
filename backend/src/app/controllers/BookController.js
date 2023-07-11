const Product = require('../models/Product');

class BookController {
    //[GET] /book/:id
    async detail(req, res) {
        const data = await Product.findById(req.params.id);
        res.send(data);
    }
}

module.exports = new BookController();

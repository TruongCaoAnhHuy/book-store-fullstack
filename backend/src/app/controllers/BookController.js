const Product = require('../models/Product');

class BookController {
    //[GET] /book/:id
    async detail(req, res) {
        try {
            const data = await Product.findById(req.params.id);
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BookController();

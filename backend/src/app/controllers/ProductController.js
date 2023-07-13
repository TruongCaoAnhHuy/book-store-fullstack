const Product = require('../models/Product');

class ProductController {
    // [POST] /admin/books/store
    async store(req, res, next) {
        const data = await Product(req.body);
        const datasave = await data.save();
        res.send({ message: 'Upload successfully !!', data: datasave });
    }

    //[GET] /admin/books
    async product(req, res, next) {
        try {
            const data = await Product.find({});
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    //[DELETE] /admin/books/delete/:id
    async delete(req, res, next) {
        const data = await Product.findByIdAndDelete(req.params.id);
        res.send({ message: 'Delete successfully, Please wait !!', data: data });
    }

    //[PUT] /admin/books/edit/:id
    async edit(req, res, next) {
        const data = await Product.findById(req.params.id);
        res.send(data);
    }

    //[POST] /admin/books/update/:id
    async update(req, res, next) {
        const data = await Product.updateOne({ _id: req.params.id }, req.body);
        res.send({ message: 'Update successfully !!', data: data });
    }
}

module.exports = new ProductController();

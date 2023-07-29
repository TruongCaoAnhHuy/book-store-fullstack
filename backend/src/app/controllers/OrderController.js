const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

class OrderController {
    async index(req, res, next) {
        try {
            const data = await User.findById(req.params.id);
            const price = req.body.map((req) => {
                return req.price * req.quantity;
            });
            const total = price.reduce((sum, price) => sum + price, 0);

            const save = { user: data, orderItems: req.body, totalPrice: total };
            const other = await Order(save);
            const datasave = await other.save();
            res.send({ data: datasave, message: 'Order Successfully !' });
        } catch (err) {
            console.log(err);
        }
    }

    async show(req, res, next) {
        try {
            const data = await Order.find({}).sort({ timestamp: -1 });
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new OrderController();

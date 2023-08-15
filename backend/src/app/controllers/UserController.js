const Category = require('../models/Category');
const User = require('../models/User');

class LoginController {
    //[GET] /admin/users
    async user(req, res, next) {
        const data = await User.find({});
        res.send(data);
    }

    //[GET] /admin/users/delete/:id
    async delete(req, res, next) {
        const data = await User.findByIdAndDelete(req.params.id);
        res.send(data);
    }

    //[GET] /admin/users/edit/:id
    async edit(req, res, next) {
        const data = await User.findById(req.params.id);
        res.send(data);
    }

    //[POST] /admin/users/update/:id
    async update(req, res, next) {
        try {
            const data = await User.updateOne({ _id: req.params.id }, req.body);
            res.send({ message: 'Update successfully !!', data: data, alert: true });
        } catch (error) {
            return res.send({ message: 'Email is already sign up !!!', alert: false });
        }
    }

    //[GET] /users/logout/:id
    async logout(req, res, next) {
        try {
            const check = await Category.findOne({ user: req.body[0].id });
            const data = await User.findById(req.body[0].id);
            const save = { user: data, cartItems: req.body[1] };
            const category = await Category(save);
            if (check) {
                await Category.updateOne({ user: req.body[0].id }, save);
                res.send({ message: 'Update !' });
            } else {
                await category.save();
                res.send({ message: 'Save !' });
            }
        } catch (err) {
            console.log(err);
        }
        // const data = req.body;
        // res.send({ message: data });
    }

    //[GET] /users/login/:id
    async login(req, res, next) {
        try {
            const data = await Category.findOne({ user: req.body.id });
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LoginController();

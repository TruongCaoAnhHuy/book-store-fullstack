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
}

module.exports = new LoginController();

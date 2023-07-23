const User = require('../models/User');

class LoginController {
    //[POST] /signin
    async login(req, res, next) {
        const { email } = req.body;
        const { password } = req.body;
        await User.findOne({ email: email, password: password })
            .then((user) => {
                if (user) {
                    const dataSend = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        createdAt: user.createdAt,
                        isAdmin: user.isAdmin,
                    };
                    res.send({ message: 'Login Success !!!', alert: true, data: dataSend });
                } else {
                    res.send({ message: 'Email or password is wrong !!!', alert: false });
                }
            })
            .catch(next);
    }
}

module.exports = new LoginController();

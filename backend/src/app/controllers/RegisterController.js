const User = require('../models/User');

class RegisterController {
    //[POST] /signup
    async register(req, res) {
        const { email } = req.body;

        try {
            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.send({ message: 'Email is already sign up !!!', alert: false });
            }

            const formData = req.body;
            const user = User(formData);

            const userRegister = await user.save();
            if (userRegister) {
                res.send({ message: 'Sign up success !!!', alert: true });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new RegisterController();

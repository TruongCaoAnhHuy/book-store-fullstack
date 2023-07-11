const siteRouter = require('./site');
const registerRouter = require('./register');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const userRouter = require('./user');
const bookRouter = require('./book');
const productRouter = require('./product');

function route(app) {
    app.post('/signup', registerRouter);
    app.post('/signin', loginRouter);
    app.use('/books', bookRouter);
    app.use('/admin/books', productRouter);
    app.use('/admin/users', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;

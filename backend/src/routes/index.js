const siteRouter = require('./site');
const registerRouter = require('./register');
const loginRouter = require('./login');
const userRouter = require('./user');
const bookRouter = require('./book');
const productRouter = require('./product');
const orderRouter = require('./order');

function route(app) {
    app.post('/signup', registerRouter);
    app.post('/signin', loginRouter);
    app.use('/books', bookRouter);
    app.use('/admin/books', productRouter);
    app.use('/admin/users', userRouter);
    app.use('/order', orderRouter);
    app.use('/', siteRouter);
}

module.exports = route;

const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// env
dotenv.config();

// Connect DB
db.connect();

app.timeout = 60000;

// HTTP logger
// app.use(morgan('combined'));

app.use(cors());
const port = process.env.PORT || 3002;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port: http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./util/logger');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const nunjucks = require('nunjucks');
require('./util/db');


const websiteRoutes = require('./routes/static');
const apiRoutes = require('./routes/');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
});

app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false,
    sourceMap: true,
    debug: false,
    outputStyle: 'compressed'
}));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', websiteRoutes);
app.use('/api', apiRoutes);

app.use('*', (req, res) => {
    res.render('404')
});

app.use((err, req, res, next) => {
    logger.error(`${ err.status } ${ req.method } ${ req.connection.remoteAddress } - s${ req.originalUrl } HTTP/${ req.httpVersion } ${ err.message } ${ req.header('Referer') }`)
    res.status(500).send('Something Went Wrong');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server listening on port " + PORT));

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const poolRoutes = require('./api/routes/pool');

var socketserver = require('http').createServer();
var io = require('socket.io')(socketserver);

io.on('connection', () =>{
    console.log('a user is connected')
})
socketserver.listen(8080);

var errorhandler = require('errorhandler')

mongoose.connect('mongodb+srv://node-shop:node-shop@cluster0-xbuxb.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;
//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(errorhandler({ dumpExceptions: true, showStack: true }))
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    res.io = io
    next(); 
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/pool', poolRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;
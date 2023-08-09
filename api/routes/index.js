const productsRouter = require('../routes/router/products.js');
const ordersRouter = require('../routes/router/orders.js')
var morgan = require('morgan');
var logger = morgan('combined');
var finalhandler = require('finalhandler')

const route = () => {
    return (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        var done = finalhandler(req, res)
        logger(req, res, (err) => {
            if (err) return done(err)
            productsRouter(req, res);
        })
        logger(req, res, (err) => {
            if (err) return done(err)
            ordersRouter(req, res);
        })
    };
};

module.exports = route;
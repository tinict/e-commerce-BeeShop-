'use strict';
const url = require('url');
const OrderController = require('../../controllers/OrdersController.js');

const orders = (req, res) => {
    if (req.url === '/create/order' && req.method === 'POST') {
        let body = '';
        let newOrder;
        res.writeHead(200, {'Content-Type': 'application/json; charset=UTF-8'});
        req.on('data', (chunk) => {
            body += chunk.toString();
            newOrder = JSON.parse(body);
            console.log(newOrder);
        }); 
        req.on('end', () => {
            OrderController.order(newOrder); 
            res.end(JSON.stringify(newOrder));
        });
    }
    if (req.url === '/api/orders' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        OrderController.get()
            .then(results => {
                res.end(JSON.stringify(results));
            })
            .catch(error => {
                console.error(error);
            });
    }
    if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryValueOder = parsedUrl.query.value;
        
        console.log(queryValueOder);
        
        if (pathname === '/orders/search') {
            console.log('active');
            if (/^\d+$/.test(queryValueOder)) {
                console.log('active 2');
                res.writeHead(200, {'Content-Type': 'application/json'});
                const searchValue = parsedUrl.query.value;
                console.log(searchValue);
                OrderController.search(searchValue)
                    .then(results => { 
                        res.end(JSON.stringify(results));
                    })
                    .catch(error => {
                        console.error(error); 
                    });
            } 
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
            }
        }
    }
}

module.exports = orders;
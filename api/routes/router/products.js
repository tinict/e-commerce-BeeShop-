'use strict';

const pdController =  require('../../controllers/ProductsController.js');
const url = require('url');
const fs = require('fs');
const multer = require("multer");
const { METHODS } = require('http');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const products = (req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        pdController.get()
            .then(results => {
                res.end(JSON.stringify(results));
            })
            .catch(error => {
                console.error(error);
            });
    }
    if (req.url === '/create/product' && req.method === 'POST') {
        upload.single('file')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }
    
            let body = '';
            let newProduct;
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            req.on('data', (chunk) => {
                body += chunk.toString();
                newProduct = JSON.parse(body);
                console.log(newProduct);
            });
            req.on('end', () => {
                pdController.post(newProduct);
                res.end(JSON.stringify(newProduct));
            });
        });
    }
    
    if (1) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryImage = parsedUrl.query.img;
      
        console.log(pathname);
      
        if (pathname === '/product/images') {
            if (queryImage) {
                const imagePath = `./uploads/${queryImage}`;
                console.log(imagePath);
                fs.readFile(imagePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } 
                else {
                    res.setHeader('Content-Type', 'image/jpeg');
                    res.statusCode = 200;
                    res.end(data);
                  }
                });
            } 
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid image parameter');
            }
        }
    }
      
    if (req.url === "/uploads" && req.method === "POST") {
        upload.single("file")(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.error(err);
            } else if (err) {
                console.error(err);
            }
      
            let body = "";
            let newProduct;
            res.writeHead(200, { "Content-Type": "application/json; charset=UTF-8" });
            req.on("data", (chunk) => {
                body += chunk.toString();
                newProduct = JSON.parse(body);
                console.log(newProduct);
            });
            req.on("end", () => {
                pdController.post(newProduct);
                res.end(JSON.stringify(newProduct));
            });
        });
    }
    if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryPage = parsedUrl.query.page;
        
        console.log(queryPage);
        
        if (pathname === '/products/list') {
            if (/^\d+$/.test(queryPage)) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                const page = parsedUrl.query.page;
                const record = parsedUrl.query.record;
                pdController.pagination(record, page)
                    .then(results => {
                        res.end(JSON.stringify(results));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } 
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Invalid page number');
            }
        }
    }
    if (req.method === 'POST') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryIDProduct = parsedUrl.query.id;
        
        console.log(queryIDProduct);
        
        if (pathname === '/products/state/update') {
            console.log('active');
            if (/^\d+$/.test(queryIDProduct)) {
                console.log('active 2');
                res.writeHead(200, {'Content-Type': 'application/json'});
                //Id product
                const id = parsedUrl.query.id;
                //Sate product update
                const state = parsedUrl.query.state;
                console.log(state);
                pdController.stateProduct(id, state)
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
    if (req.method === 'POST') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryIDProduct = parsedUrl.query.id;
        
        console.log(queryIDProduct);
        
        if (pathname === '/products/item/delete') {
            console.log('active');
            if (/^\d+$/.test(queryIDProduct)) {
                console.log('active 2');
                res.writeHead(200, {'Content-Type': 'application/json'});
                //Id product
                const id = parsedUrl.query.id;
                console.log(id);
                pdController.deleteProduct(id)
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
    if (req.method === 'POST') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const queryIDProduct = parsedUrl.query.id;
        
        console.log(queryIDProduct);
        if (pathname === '/products/item/update') {
            console.log('active');
            if (/^\d+$/.test(queryIDProduct)) {
                console.log('active 2');
                res.writeHead(200, {'Content-Type': 'application/json'});
                //Id product
                const id = parsedUrl.query.id;
                console.log(id);
                
                let body = '';
                let newProduct;
                
                req.on('data', (chunk) => {
                    body += chunk.toString();
                    newProduct = JSON.parse(body);
                    console.log(newProduct);
                }); 
                req.on('end', () => {
                    pdController.updateProduct(id, newProduct);
                    res.end(JSON.stringify(newProduct));
                });
            } 
            else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
            }
        }
    }
}
 
module.exports = products;

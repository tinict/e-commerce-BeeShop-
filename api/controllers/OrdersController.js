'use strict';

const conn = require('../config/ConnectDB.js');

const OrderController = {
    order: (data) => {
        let orderData = "INSERT INTO `beeshop`.`order` (`FulllName`, `Phone`, `Address`, `Email`, `ShippingMethod`, `PaymentMethod`, `ID`, `NameProduct`, `Quantity`, `CashMoney`, `StatePayment`) ";
        let newOrder = Object.values(data).map((value) => {
            return `${'"' + value + '"'}`;
        }).join(', ');
        let value = `VALUES (${newOrder})`;
        let sql = `${orderData}${value}`;
        console.log(sql);
        conn.query(sql); 
        console.log(data);
    },
    get: () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM beeshop.order`;
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } 
                else {
                    resolve(result);
                }
            })
        })
    },
    pagination: (record, page) => {
        return new Promise ((resolve, reject) => {
            const Records_Per_page = record;
            const page_Number = page;
            const offset_value = (page_Number - 1) * Records_Per_page;
            const sql = `SELECT * FROM product LIMIT ${Records_Per_page} OFFSET ${offset_value}`;
            
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } 
                else {
                    resolve(result);
                }
            })
        })
    },
    search: (ID_Order) => {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT * FROM beeshop.order where Order_ID = ${ID_Order}`;
            
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } 
                else {
                    resolve(result);
                }
            })
        })
    }
};

module.exports = OrderController;
'use strict';

const conn = require('../config/ConnectDB.js');

const pdController = {
    get: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM product';
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    post: (data) => {
        let titleProduct = "INSERT INTO `beeshop`.`product` (`TitleProduct`, `SKU`, `Brand`, `NameProduct`, `Category`, `Cost`, `Unit`, `Quantity`, `TypeProduct`, `ImageProduct`, `Description`) ";
        let newProduct = Object.values(data).map((value) => {
            return `${'"' + value + '"'}`;
        }).join(', ');
        let value = `VALUES (${newProduct})`;
        let sql = `${titleProduct}${value}`;
        console.log(sql);
        conn.query(sql);
        console.log(data);
    },
    pagination: (record, page) => {
        return new Promise ((resolve, reject) => {
            const Records_Per_page = record;
            const page_Number = page;
            const offset_value = (page_Number-1) * Records_Per_page;
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
    stateProduct: (id, state) => {
        return new Promise ((resolve, reject) => {
            const sql = `UPDATE beeshop.product SET Sate = ${state} WHERE (IdProduct = ${id})`;
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
    deleteProduct: (id) => {
        return new Promise ((resolve, reject) => {
            const sql = `DELETE FROM product WHERE (IdProduct = ${id});`;
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
    updateProduct: (id, dataUpdate) => {
        return new Promise ((resolve, reject) => {
            let createSQL = (TitleProduct, SKU, Brand, NameProduct, Category, Cost, Unit, Quantity, TypeProduct, ImageProduct, Description, CreateTime) => {
                return `UPDATE product SET TitleProduct = "${TitleProduct}", SKU = "${SKU}", Brand = "${Brand}", NameProduct = "${NameProduct}", Category = "${Category}", Cost = ${Cost}, Unit = "${Unit}", Quantity = ${Quantity}, TypeProduct = "${TypeProduct}", ImageProduct = "${ImageProduct}", Description = "${Description}" WHERE (IdProduct = ${id})`;
            }
            const sql = createSQL(...dataUpdate);
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

module.exports = pdController;
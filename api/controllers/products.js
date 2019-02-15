const Product = require('../models/product');
const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

exports.products_get_all = (req, res, next) =>{
    
    Product.find().select('name price _id productImage').exec().then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/products/' + doc._id
                    }
                }
            })
        };

        //if(docs.length >= 0){
        res.status(200).json(response);
        //} else {
        //    res.status(404).json({
        //        message: 'No entries found'
        //    });
        //}

        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    /*res.status(200).json({
        message: 'Handling GET requests to /products'
    });*/
}

exports.products_create_product = (req, res, next) =>{
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Create product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3001/products/" + result._id
                }

            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}

exports.products_get_product = (req, res, next) => {

    const id = req.params.productId;

    client.get(req.body.id, function(err, value){

        if(err) {
            return console.log(err);
        }

        if(value) {
            console.log("RETURN CACHED DATA")
            res.json(JSON.parse(value));
        } else {

            Product.findById(id).select("name price _id").exec().then(doc => {
                console.log("From database", doc);
                if(doc){
                    console.log("RETURN DB DATA");
                    const resBody = {
                        product: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3001/products'
                        }
                    }
                    client.set(req.params.id, JSON.stringify(resBody));
                    res.status(200).json(resBody);
                } else {
                    res.status(404).json({
                        message: 'No valid entery found for provide ID'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });

        }
    })


    

    /*const id = req.params.productId;
    if(id == 'special'){
        res.status(200).json({
            message: 'You discovered th special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }*/
}

exports.products_update = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps}).exec().then(result =>{
        
        res.status(200).json({
            message: 'product updated productImage',
            request: {
                type: 'GET',
                url: 'http://localhost:3001/products/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

    /*res.status(200).json({
        message: 'Update product'
    });*/
}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then( result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3001/products/',
                body: {
                    name: 'String', price: 'Number'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
    /*res.status(200).json({
        message: 'Deleted product'
    });*/
}
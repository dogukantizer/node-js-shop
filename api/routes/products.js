const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'iamge/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
    
};

//const upload = multer({dest: 'uploads/'});
const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');

router.get('/', ProductsController.products_get_all);


router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

/*
router.post('/', (req, res, next) =>{
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
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

    
}); */

router.get('/:productId', ProductsController.products_get_product);


router.patch('/:productId', checkAuth, ProductsController.products_update);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);


module.exports =router;
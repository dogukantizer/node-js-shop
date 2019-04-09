const Pool = require('../models/pool');
const moongose = require('mongoose');

exports.pool_create_pool = (req, res, next) =>{
    
    const updateOps = {};
    updateOps['status'] = 'P';
    Pool.updateMany({userId: req.body.userId}, { $set: updateOps}).exec().then(result =>{
        
        const pool = new Pool({
            _id: new moongose.Types.ObjectId(),
            userId: req.body.userId,
            gender: req.body.gender,
            interestedGender: req.body.interestedGender,
            status: 'W'
        });
        pool.save().then(result => {
            console.log(result);
    
            res.io.emit('5cac92610eb360650b9bdf5c', 'Waiting');
            res.status(201).json({
                message: 'Create pool successfully',
                createdPool: {
                    status: result.status,
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
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
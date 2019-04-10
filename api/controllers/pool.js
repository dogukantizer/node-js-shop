const Pool = require('../models/pool');
const moongose = require('mongoose');

exports.pool_create_pool = (req, res, next) => {

    const updateOps = {};
    updateOps['status'] = 'P';
    Pool.updateMany({ userId: req.body.userId }, { $set: updateOps }).exec().then(result => {

        const pool = new Pool({
            _id: new moongose.Types.ObjectId(),
            userId: req.body.userId,
            gender: req.body.gender,
            interestedGender: req.body.interestedGender,
            status: 'W'
        });
        pool.save().then(result => {
            console.log(result);

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

exports.pool_match_user =  (req, res, next) =>  {

    Pool.findById(req.params.poolId).exec()
        .then(currentPool => {
            Pool.find({ _id: { $ne: req.params.poolId } })
                .where('status').equals('W')
                .where('gender').equals(currentPool.interestedGender)
                .where('interestedGender').equals(currentPool.gender)
                .exec()
                .then(async targetPools => {
                    if (!targetPools) {
                        return res.status(404).json({
                            message: 'Target pool not found'
                        });
                    }
                    var targetPool = targetPools[0]

                    // create room

                    // update current and target pool
                    const currentUserResult = await updateUserPool(currentPool._id)
                    if(currentUserResult == "Success"){
                        console.log('Current Update Success')

                        const targetUserResult = await updateUserPool(targetPool._id)
                        if(targetUserResult == "Success"){
                            console.log('Target Update Success')
                        }
                    }

                    // emit target pool user
                    res.io.emit(targetPool._id, 'Matched');

                    res.status(200).json({
                        count: targetPools.length,
                        pools: targetPools.map(targetPool => {
                            return {
                                pool: targetPool
                            }
                        })
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        })


}

async function updateUserPool(id) {

    return new Promise((resolve, reject) => {

        const updateOps = {};
        updateOps['status'] = 'M';
        //updateOps['roomId'] = 'M';
        
        Pool.updateOne({ _id: id }, { $set: updateOps }).exec().then(result => {
            
            resolve("Success")
        }).catch(err => {
            console.log(err);
            resolve("Fail")
        });

    });
}

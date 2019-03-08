const tankModel = require('../models/tanks');

module.exports = {

    getById: function(req, res, next) {
        //console.log(req.body);
        if (typeof req.params.tankId !== 'undefined') {
            tankModel.findById(req.params.tankId, function(err, tankInfo){
                if(err) {
                    next(err);
                } else {
                    res.json({status: "success", message: "tank found", data: {tanks: tankInfo}});
                }
            });
        } else {
            res.json({status:"error", message: "tank_id is required parameter", data:null});
        }
    },

    getAll: function(req, res, next) {
        let tanksList = [];
        //console.log(req);
        //if (typeof req.params.tankId !== 'undefined') {
            tankModel.find({}, function(err, tanks){
                if(err) {
                    next(err);
                } else {
                    for(let tank of tanks) {
                        tanksList.push({id: tank._id, name: tank.name, released_on: tank.released_on});
                    }
                    res.json({status: "success", message: "tanks list found", data: {tanks: tanksList}});
                }
            });
        //} else {
        //    res.json({status:"error", message: "tank_id is required parameter", data:null});
        //}
    },

    updateById: function(req, res, next) {
        tankModel.findByIdAndUpdate(req.params.tankId, {name:req.body.name}, function(err, tankInfo){
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank updated successfully", data: null});
            }
        });
    },

    deleteById: function(req, res, next) {
        tankModel.findByIdAndRemove(req.params.tankId, function(err, tankInfo){
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank deleted successfully", data: null});
            }
        });
    },

    create: function(req, res, next) {
        if (typeof req.body.type !== 'undefined' && typeof req.body.capacity !== 'undefined' && typeof req.body.status !== 'undefined') {
            tankModel.create({name: req.body.name, released_on: req.body.released_on }, function (err, result) {
                if(err) {
                    next(err);
                } else {
                    res.json({status: "success", message: "tank added successfully", data: null});
                }
            });
        } else {
            res.json({status:"error", message: "type, capacity and status is required", data:null});
        }
    },

}

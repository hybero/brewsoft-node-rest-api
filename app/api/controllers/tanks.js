const tankModel = require('../models/tanks');

module.exports = {

    getById: function(req, res, next) {
        console.log(req.body);
        tankModel.findById(req.params.tankId, function(err, tankInfo){
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank found!!!", data: {tanks: tankInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        let tanksList = [];
        tankModel.find({}, function(err, tanks){
            if(err) {
                next(err);
            } else {
                for(let tank of tanks) {
                    tanksList.push({id: tank._id, name: tank.name, released_on: tank.released_on});
                }
                res.json({status: "success", message: "tanks list found!!!", data: {tanks: tanksList}});
            }
        });
    },

    updateById: function(req, res, next) {
        tankModel.findByIdAndUpdate(req.params.tankId, {name:req.body.name}, function(err, tankInfo){
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank updated successfully!!!", data: null});
            }
        });
    },

    deleteById: function(req, res, next) {
        tankModel.findByIdAndRemove(req.params.tankId, function(err, tankInfo){
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank deleted successfully!!!", data: null});
            }
        });
    },

    create: function(req, res, next) {
        tankModel.create({name: req.body.name, released_on: req.body.released_on }, function (err, result) {
            if(err) {
                next(err);
            } else {
                res.json({status: "success", message: "tank added successfully!!!", data: null});
            }
        });
    },

}

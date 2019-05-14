var Assignment = require('../models/assignment.model');

exports.create = (req, res) => {
    var assignment = new Assignment({
        name: req.body.name,
        description: req.body.description || null,
        startDate: req.body.startDate,
        endDate: req.body.endDate || null,
        FTEPerWeek: req.body.FTEPerWeek
    });

    assignment.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Assignment."
            });
        });
};

exports.findAll = (req, res) => {
    Assignment.find().lean()
        .then(assignments => {
            res.send(assignments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving assignments."
            });
        });
};

exports.findOne = (req, res) => {
    Assignment.findById(req.params.id).lean()
        .then(assignment => {
            if(!assignment){
                return res.status(404).send({
                    message: "Assignment not found with id " + req.params.id
                });
            }
            res.send(assignment);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Assignment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
};

exports.update = (req, res) => {
    Assignment.findById(req.params.id, (err, assignment) => {
        assignment.set(req.body);
        assignment.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Assignment not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating assignment with id " + req.params.id
            });
        });
    });
}

exports.delete = (req, res) => {
    Assignment.findByIdAndRemove(req.params.id)
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "Assignment not found with id " + req.params.id
            });
        }
        res.send({message: "Assignment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Assignment not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete assignment with id " + req.params.id
        });
    });
};

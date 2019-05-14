var Employee = require('../models/employee.model');

exports.create = (req, res) => {
    console.log(req.body.assignments);
    var employee = new Employee({
        name: req.body.name,
        assignments: req.body.assignments    
    });
    
    employee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};

exports.findAll = (req, res) => {
    Employee.find()
        .then(employees => {
            res.send(employees);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving employees."
            });
        });
};

exports.findOne = (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            if(!employee){
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.id
                });
            }
            res.send(employee);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            });
        });
};

exports.update = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        assignments: req.body.assignments  
    }, {runValidators: true, context: 'query', new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    });
};

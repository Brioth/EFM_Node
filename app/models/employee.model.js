var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var EmployeeSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    assignments: [{
        assignmentId: {type: 'ObjectId', ref: 'Assignment', required: true},
        startDate: {type: Date, required: true},
        endDate: Date,
        FTEPerWeek: {type: Number, required: true}
    }]
}, {collection: 'Employees'});

EmployeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Employee', EmployeeSchema);
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var AssignmentSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    startDate: {type: Date, required: true},
    endDate: Date,
    FTEPerWeek: {type: Number, required: true}
},{collection: 'Assignments'});

AssignmentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Assignment', AssignmentSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KanaGroupingSchema = new Schema({

    grouping: {
            type: String, required: '{PATH} is required', unique: true
    },
    order: Number,
    type: String
});

var KanaGrouping = mongoose.model('KanaGrouping', KanaGroupingSchema);
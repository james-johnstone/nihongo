var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KanaGroupingSchema = new Schema({

    grouping: {
            type: String, required: '{PATH} is required', unique: true
    },
    type: String,
    order: Number,
    hiragana: {
        type: mongoose.Schema.ObjectId, ref: 'Hiragana'
    },
    katagana: {
        type: mongoose.Schema.ObjectId, ref: 'Katagana'
    },   

});

var KanaGrouping = mongoose.model('KanaGrouping', KanaGroupingSchema);
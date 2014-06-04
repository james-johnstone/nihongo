var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Kana = new Schema(
    {
        Kana: {
            type: String, required: '{PATH} is required', unique: true
        },
        Translation: String,
        Audio: String,
        StokeOrder: String
    });

var Hiragana = mongoose.model('Hiragana', Kana);
var Katagana = mongoose.model('Katagana', Kana);
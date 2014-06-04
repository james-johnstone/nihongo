var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kana = new Schema(
    {
        kana: {
            type: String, required: '{PATH} is required'//, unique: true
        },
        translation: String,
        order: Number,
        kanaGroup: {
            type: mongoose.Schema.ObjectId, ref: 'KanaGrouping'
        },
        audio: String,
        stokeOrder: String
    });

var Hiragana = mongoose.model('Hiragana', kana);
var Katakana = mongoose.model('Katakana', kana);
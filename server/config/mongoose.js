var mongoose = require('mongoose'),
    Grid = require('gridfs-stream'),
    userModel = require('../models/user'),
    hiraganaModel = require('../models/kana'),
    katakanaModel = require('../models/kana'),
    KanaGroupingModel = require('../models/KanaGrouping');

module.exports = function (config) {

    Grid.mongo = mongoose.mongo;

    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error ...'));

    db.once('open', function callback() {
        var gridFileSystem = Grid(db);
        console.log('nihongo mongo connected!');
    });

    userModel.createDefaultUsers();
};


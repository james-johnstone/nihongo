var Hiragana = require('mongoose').model('Hiragana');

exports.getHiraganas = function (req, res) {
    Hiragana.find({}).populate('kanaGroup').exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getHiragana = function (req, res) {
    Hiragana.findOne({ _id: req.params.id }).exec(function (err, kana) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(kana);
    });
};

exports.createHiragana = function (req, res, next) {
    var hiraganaData = req.body;

    Hiragana.create(hiraganaData, function (err, kana) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('kana already created');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(kana);
    });
};

exports.updateHiragana = function (req, res) {
    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }
    // pull object id out of the req.body so we don't throw it to mongo update
    var hiraganaData = req.body;
    var hiraganaID = hiraganaData._id;
    delete hiraganaData._id;

    Hiragana.update({ _id: hiraganaID }, { $set: hiraganaData }, function (err) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Kana already exists');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.hiragana);
    });
};

exports.deleteHiragana = function (req, res) {

    Hiragana.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
};
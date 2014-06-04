var Katakana = require('mongoose').model('Katakana');

exports.getKatakanas = function (req, res) {
    Katakana.find({}).populate('kanaGroup').exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getKatakana = function (req, res) {
    Katakana.findOne({ _id: req.params.id }).exec(function (err, kana) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(kana);
    });
};

exports.createKatakana = function (req, res, next) {
    var katakanaData = req.body;

    Katakana.create(katakanaData, function (err, kana) {
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

exports.updateKatakana = function (req, res) {
    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }
    // pull object id out of the req.body so we don't throw it to mongo update
    var katakanaData = req.body;
    var katakanaID = katakanaData._id;
    delete katakanaData._id;

    Katakana.update({ _id: katakanaID }, { $set: katakanaData }, function (err) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Kana already exists');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.katakana);
    });
};

exports.deleteKatakana = function (req, res) {

    Katakana.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
};
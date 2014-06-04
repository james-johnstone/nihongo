var KanaGroup = require('mongoose').model('KanaGrouping');

exports.getKanaGroups = function (req, res) {
    KanaGroup.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getKanaGroup = function (req, res) {
    KanaGroup.findOne({ _id: req.params.id }).exec(function (err, kana) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(kana);
    });
};

exports.createKanaGroup = function (req, res, next) {
    var kanaGroupData = req.body;

    KanaGroup.create(kanaGroupData, function (err, kana) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('group already created');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(kana);
    });
};

exports.updateKanaGroup = function (req, res) {
    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }
    // pull object id out of the req.body so we don't throw it to mongo update
    var kanaGroupData = req.body;
    var kanaID = kanaGroupData._id;
    delete kanaGroupData._id;

    KanaGroup.update({ _id: kanaID }, { $set: kanaGroupData }, function (err) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('group already exists');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.kanaGroup);
    });
};

exports.deleteKanaGroup = function (req, res) {

    KanaGroup.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
};
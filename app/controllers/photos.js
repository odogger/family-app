/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo'),
    _ = require('underscore');


/**
 * Find article by id
 */
exports.photo = function(req, res, next, id) {
    Photo.load(id, function(err, photo) {
        if (err) return next(err);
        if (!photo) return next(new Error('Failed to load photo ' + id));
        req.photo = photo;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var photo = new Photo(req.body);
    photo.user = req.user;

    photo.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                photo: photo
            });
        } else {
            res.jsonp(photo);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var photo = req.photo;

    photo = _.extend(photo, req.body);

    photo.save(function(err) {
        res.jsonp(photo);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var photo = req.photo;

    photo.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(photo);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.photo);
};

/**
 * List of Articles
 */
exports.all = function (req, res, next) {
    var pageSize = parseInt(req.query.pageSize) || 10
    var page = parseInt(req.query.page) || 1,
    num = (page - 1) * pageSize;
    Photo.find()
        .skip(num)
        .limit(pageSize)
        .sort('-created').populate('user', 'name username').exec(function (err, photo) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(photo);
        }
    });
};

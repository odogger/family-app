/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Video = mongoose.model('Video'),
    _ = require('underscore');


/**
 * Find article by id
 */
exports.video = function(req, res, next, id) {
    Video.load(id, function(err, video) {
        if (err) return next(err);
        if (!video) return next(new Error('Failed to load video ' + id));
        req.video = video;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var video = new Video(req.body);
    video.user = req.user;

    video.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                video: video
            });
        } else {
            res.jsonp(video);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var video = req.video;

    video = _.extend(video, req.body);

    video.save(function(err) {
        res.jsonp(video);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var video = req.video;

    video.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(video);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.video);
};

/**
 * List of Articles
 */
exports.all = function (req, res, next) {
    var pageSize = parseInt(req.query.pageSize) || 10
    var page = parseInt(req.query.page) || 1,
    num = (page - 1) * pageSize;
    Video.find()
        .skip(num)
        .limit(pageSize)
        .sort('-created').populate('user', 'name username').exec(function (err, video) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(video);
        }
    });
};

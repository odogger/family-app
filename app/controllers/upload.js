/**
 * Module dependencies.
 */
var moment = require('moment');

/**
* Upload and save image yo.
*/
exports.save = function (req, res) {
    var fs = require('fs');
    var path = require('path');
    var now = moment().format("YYYYMMDDHHmmss");
    var ext = path.extname(req.files.myFile.name).toLowerCase();
    var relative = '/img/' + now + ext;
    var tempPath = req.files.myFile.path,
        targetPath = path.resolve('./public/img/') + '/' + now + ext;
    console.log(targetPath);
    fs.rename(tempPath, targetPath, function (err) {
        if (err) throw err;
        console.log("Upload completed!");
    });
    var obj = {
        result: [
            {
                fieldName: req.files.myFile.name,
                name: req.files.myFile.name + "append",
                size: req.files.myFile.size,
                value: relative //Place to put url of saved image.
            }
        ]
    }
    res.json(obj)
};


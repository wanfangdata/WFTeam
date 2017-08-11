var url = require('url');
var db = require('../db/db.js');

/**
 * 获取工时列表
 */
module.exports.getMandays = function (req, res, next) {
  var params = req.swagger.params;

  db.mandays.find({})
    .sort({ date: 'desc' })
    .exec(function (err, docs) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(docs, null, 2));
    });
};

/**
 * 新增工时
 */
module.exports.addManday = function (req, res, next) {
  var model = req.swagger.params.body.value;
  var userName = req.headers["api_key"];

  db.mandays.findOne({ date: model.date, projectKey: model.projectKey, userName: userName }, function (err, doc) {
    if (!!doc) {
      res.end();
    }
    else {
      var manday = new db.mandays();
      manday.date = model.date;
      manday.projectKey = model.projectKey;
      manday.userName = userName;
      manday.hours = model.hours;
      manday.description = model.description;

      manday.save(function (err) {
        res.end();
      });
    }
  });
};
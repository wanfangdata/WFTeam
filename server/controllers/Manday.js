var url = require('url');
var db = require('../db/db.js');

/**
 * 获取工时列表
 */
module.exports.getMandays = function (req, res, next) {
  var show = req.swagger.params["show"].value;
  var userName = req.headers["api_key"];

  var filter = {};
  if (show == "me") {
    filter["userName"] = userName;
  }

  db.mandays.find(filter)
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

/**
 * 编辑工时
 */
module.exports.modifyManday = function (req, res, next) {
  var _id = req.swagger.params._id.value;
  var model = req.swagger.params.body.value;
  var userName = req.headers["api_key"];

  db.mandays.findOne({ _id: _id, userName: userName }, function (err, doc) {
    if (!!doc) {
      //var manday = new db.mandays();
      doc.date = model.date;
      doc.projectKey = model.projectKey;
      //doc.userName = userName;
      doc.hours = model.hours;
      doc.description = model.description;

      db.mandays.update({ _id: _id }, doc, function (err) {
        res.end();
      });
    }
    else {
      res.end();
    }
  });
};

/**
 * 删除工时
 */
module.exports.deleteManday = function (req, res, next) {
  var _id = req.swagger.params._id.value;
  var userName = req.headers["api_key"];

  db.mandays.findOne({ _id: _id, userName: userName }, function (err, doc) {
    if (!!doc) {
      db.mandays.remove({ _id: _id }, function (err) {
        res.end();
      });
    }
    else {
      res.end();
    }
  });
};
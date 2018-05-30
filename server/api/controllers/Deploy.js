var url = require('url');
var db = require('../../db/db');

module.exports.getDeploys = function (req, res, next) {
  var params = req.swagger.params;

  db.deploys.find({})
    .sort({ createTime: 'desc' })
    .exec(function (err, docs) {
      res.json(docs);
    });
};

/**
 * 新增部署
 */
module.exports.addDeploy = function (req, res, next) {
  var model = req.swagger.params.body.value;
  var userName = req.headers["api_key"];

  var deploy = new db.deploys();
  deploy.deployName = model.deployName;
  deploy.deployProject = model.deployProject;
  deploy.deployProjectVersion = model.deployProjectVersion;
  deploy.deployContent = model.deployContent;
  deploy.createTime = new Date();
  deploy.creator = userName;
  deploy.deployed = model.deployed;

  deploy.save(function (err) {
    res.json();
  });
};

/**
 * 编辑部署
 */
module.exports.modifyDeploy = function (req, res, next) {
  var _id = req.swagger.params._id.value;
  var model = req.swagger.params.body.value;

  db.deploys.findOne({ _id: _id }, function (err, doc) {
    if (!!doc) {
      doc.deployName = model.deployName;
      doc.deployProject = model.deployProject;
      doc.deployProjectVersion = model.deployProjectVersion;
      doc.deployContent = model.deployContent;
      doc.deployed = model.deployed;

      db.deploys.update({ _id: _id }, doc, function (err) {
        res.json();
      });
    }
    else {
      res.json();
    }
  });
};

module.exports.deleteDeploy = function (req, res, next) {
  var _id = req.swagger.params._id.value;

  db.deploys.findOne({ _id: _id }, function (err, doc) {
    if (!!doc) {
      db.deploys.remove({ _id: _id }, function (err) {
        res.json();
      });
    }
    else {
      res.json();
    }
  });
};
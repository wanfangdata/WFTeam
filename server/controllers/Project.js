var url = require('url');
var db = require('../db/db.js');

module.exports.getProjects = function (req, res, next) {
  var params = req.swagger.params;

  db.projects.find({}, function (err, docs) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(docs, null, 2));
  });
};


module.exports.addProject = function (req, res, next) {
  var model = req.swagger.params.body.value;

  db.projects.findOne({ projectKey: model.projectKey }, function (err, doc) {
    if (!!doc) {
      res.end();
    }
    else {
      var project = new db.projects();
      project.projectKey = model.projectKey;
      project.projectName = model.projectName;

      project.save(function (err) {
        res.end();
      });
    }
  });
};
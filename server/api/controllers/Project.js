var url = require('url');
var db = require('../../db/db');

module.exports.getProjects = function (req, res, next) {
  var params = req.swagger.params;

  db.projects.find({}, function (err, docs) {
    res.json(docs);
  });
};


module.exports.addProject = function (req, res, next) {
  var model = req.swagger.params.body.value;

  db.projects.findOne({ projectKey: model.projectKey }, function (err, doc) {
    if (!!doc) {
      res.json();
    }
    else {
      var project = new db.projects();
      project.projectKey = model.projectKey;
      project.projectName = model.projectName;

      project.save(function (err) {
        res.json();
      });
    }
  });
};
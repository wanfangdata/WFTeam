var url = require('url');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27107/test');

var projectSchema = new mongoose.Schema({
  projectName:String,
  projectKey:String
});

module.exports.getProjects = function (req, res, next) {
  var params = req.swagger.params;

  var projectsModel = mongoose.model("projects", projectSchema);
  var project = new projectsModel({ projectName: "项目1", projectKey: "Project1" });

  project.save();


  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ userName: "hueidou", realName: null }, null, 2));
  return;

};
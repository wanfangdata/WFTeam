var url = require('url');
var db = require('../../db/db');

/**
 * 登录
 */
module.exports.loginUser = function (req, res, next) {
  // 判断是否有此userName，如果不存在，则需要完善profile
  var model = req.swagger.params.body.value;

  db.users.findOne({ userName: model.userName }, function (err, doc) {
    if (!!doc) {
      // 如果存在，直接返回userModel
      res.json(doc);
    }
    else {
      // 如果不存在，直接注册
      var user = new db.users();
      user.userName = model.userName;

      user.save(function (err) {
        res.json(user);
      });
    }
  });
};

/**
 * 完善用户信息
 */
module.exports.profileUser = function (req, res, next) {
  var userName = req.headers["api_key"];
  var realName = req.body.realName;

  db.users.update({ userName: userName }, { realName: realName }, function (err) {
    res.json();
  });
};

/**
 * 获取用户列表
 */
module.exports.getUsers = function (req, res, next) {
  db.users.find({}, function (err, docs) {
    res.json(docs);
  });
};
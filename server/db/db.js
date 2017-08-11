var mongoose = require('mongoose');

mongoose.connect('mongodb://' + process.env.MONGODB_CONNECTION);

/**
 * 项目
 */
var projectSchema = new mongoose.Schema({
    projectKey: String,
    projectName: String,
    hours: Number
});

/**
 * 用户、成员
 */
var userSchema = new mongoose.Schema({
    userName: String,
    realName: String,
    hours: Number
});

/**
 * 人天、工时
 */
var mandaySchema = new mongoose.Schema({
    date: Date,
    userName: String,
    realName: String,
    projectKey: String,
    projectName: String,
    hours: Number,
    description: String
});


module.exports = {
    projectSchema: projectSchema,
    userSchema: userSchema,
    mandaySchema: mandaySchema,
    projects: mongoose.model("projects", projectSchema),
    users: mongoose.model("users", userSchema),
    mandays: mongoose.model("mandays", mandaySchema)
};

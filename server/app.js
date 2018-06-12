var path = require('path');
var serveStatic = require('serve-static');
var SwaggerConnect = require('swagger-connect');
var app = require('connect')();
var history = require('connect-history-api-fallback');
module.exports = app; // for testing

// use serveStatic first, history fallback not work.
// app.use(serveStatic(path.join(__dirname, 'public')));
app.use(history());
app.use(serveStatic(path.join(__dirname, 'public')));

var config = {
  appRoot: __dirname // required config
};

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);

  var port = process.env.PORT || 8000;
  app.listen(port);

  if (swaggerConnect.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api/hello?name=Scott');
  }
});

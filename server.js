
/**
 * Module dependencies.
 */

require('coffee-script');

var express = require('express'),
    RedisStore = require('connect-redis')(express);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser({
    secret: "asdfnt43k2n!$:LNEGW:N!42`2ASKFNa124;kndSF1afs:naAdasd",
    store: new RedisStore
  }));
  app.use(express.session({
    secret: "aadQWEqesdfQ24!$%@knkAnf;agn"
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('test', function(){
  app.set('port', 3001);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Helpers

require('./apps/helpers')(app);

// Routes

require('./apps/authentication/routes')(app);

app.listen(app.settings.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

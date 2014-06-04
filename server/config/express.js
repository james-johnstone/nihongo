var express         = require('express'),
    passport        = require('passport'),
    less            = require('less-middleware'),
    morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    expressSession  = require('express-session')
    path            = require('path');

module.exports = function (app, config) {

    //function compile(str, path) {
    //    return less(str).set('filename', path);
    //}

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(expressSession({ secret: 'nihongo' }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(less(path.join(config.rootPath + '/public'),
        {
            //remove for production!!
            force: true
        }
    ));
    app.use(express.static(config.rootPath + 'public'));
}
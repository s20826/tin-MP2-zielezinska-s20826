var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const indexRouter = require('./routes/index');
const animalRouter = require('./routes/animalRoute');
const clientRouter = require('./routes/clientRoute');
const vetRouter = require('./routes/vetRoute')
const visitRouter = require('./routes/visitRoute')
const animalApiRouter = require('./routes/api/AnimalApiRoute');
const clientApiRouter = require('./routes/api/ClientApiRoute');
const vetApiRouter = require('./routes/api/VetApiRoute');
const visitApiRouter = require('./routes/api/VisitApiRoute');
const authUtils = require('./util/authUtils');
const authApiRouter = require('./routes/api/AuthApiRoute')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
const i18n = require('i18n');
i18n.configure({
  locales: ['pl','en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang',
});

app.use((req, res, next) => {
  if(!res.locals.lang){
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth',authApiRouter)
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));



app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});




app.use('/', indexRouter);
app.use('/animals',animalRouter);
app.use('/clients', authUtils.permitAuthenticatedUser,clientRouter);
app.use('/vets',vetRouter);
app.use('/visits', authUtils.permitAuthenticatedUser,visitRouter);
app.use('/api/animals', animalApiRouter);
app.use('/api/clients', clientApiRouter);
app.use('/api/vets',vetApiRouter);
app.use('/api/visits',visitApiRouter);
app.use('/api/auth',authApiRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

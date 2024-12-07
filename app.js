var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

const app = express();
const exphbs = require('express-handlebars');
const i18n = require('./config/i18n.js');
app.use(i18n.init);
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
  // helpers: {
  //   t: (key, ...args) => {
  //     const value = i18n.__.apply(this, [key].concat(args));
  //     console.log('key, args:', key, args)
  //     console.log(`Translate key: ${key}, value: ${value}`, i18n.__);
  //     return value;
  //   },
  // },
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { ensureAuthenticated } = require('./middleware/auth');
const passport = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');

//require('./config/passport')(passport);
app.use(
  session({
    secret: 'Zhi3Q5', // Chuỗi bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không thay đổi
    saveUninitialized: false, // Không lưu session chưa được khởi tạo
    cookie: {
      maxAge: 3600000, // 1 giờ (đơn vị: millisecond)
      secure: false, // Nếu là HTTPS, đặt thành true
      httpOnly: true, // Cookie chỉ truy cập từ HTTP, không thể truy cập bằng JavaScript
    },
  })
);

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use((req, res, next) => {
  res.locals.t = (key, ...args) => {
    //return i18n.__.apply(req, [key].concat(args));
    const value = i18n.__.apply(req, [key].concat(args));
    console.log('Current locale:', req.getLocale());
    console.log(`Key: ${key}, Translated Value: ${value}`);
    return value;
  };
  next();
})

app.use((req, res, next) => {
  const publicRoutes = ['/auth/login', '/auth/register'];
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  // Set default layout
  res.locals.layout = 'classic-office-layout';
  res.locals.menus = require('./resources/menu').menus;
  ensureAuthenticated(req, res, next)
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use('/report', require('./routes/report'));
app.use('/settings', require('./routes/db'));
app.use('/users', require('./routes/users'));
app.use('/resources', require('./routes/resources'));
app.use('/office', require('./routes/office'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = { app };


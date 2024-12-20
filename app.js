const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const { settings } = require('./resources/settings');

const app = express();
const hbsEngine = require('./handlebars/configuration');
const i18n = require('./config/i18n.js');
app.use(i18n.init);

app.engine('hbs', hbsEngine);
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
  const publicRoutes = ['/auth/login', '/auth/register'];
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  // Set default layout
  const options = {
    layout: 'classic-office-layout',
    menus: require('./resources/menu').menus,
    settings,
  };
  if (settings?.log) {
    console.log('settings:', options)
  }

  res.locals = options;
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
app.use(require('./routes/disk-info'));

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


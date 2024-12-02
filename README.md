
# 1. Khởi tạo dự án

npx express-generator --view=hbs zta
cd zta
npm install

# 2. Cấu trúc thư mục
```
zta/
├── bin/
├── config/
│   ├── config.json         # File cấu hình Sequelize
├── controllers/            # Xử lý logic ứng dụng
├── middleware/             # Middleware (auth, validation, etc.)
├── models/                 # Sequelize models
├── public/
├── routes/                 # Routes chính của ứng dụng
├── translations/           # Resource đa ngôn ngữ
│   ├── en.json
│   ├── vi.json
├── views/
└── .env                    # Cấu hình môi trường
```


# 3. Cấu hình Sequelize

```
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_username",
    "password": "your_password",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_username",
    "password": "your_password",
    "database": "",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

npx sequelize-cli init

createdb vorasfdb -U vorasf

npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string

npx sequelize-cli db:migrate

# 4. Thêm i18n (đa ngôn ngữ)

```
{
  "welcome": "Welcome to ZTA!",
  "error_required": "This field is required."
}


{
  "welcome": "Chào mừng đến với ZTA!",
  "error_required": "Trường này là bắt buộc."
}

```
# Cài đặt i18n trong app.js

i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/translations',
    defaultLocale: 'en',
    queryParameter: 'lang', // query (e.g., ?lang=vi)
});

app.use(i18n.init);

# Trong các views, dùng:
 <h1>{{__('welcome')}}</h1>

# 5. Middleware xử lý validate dữ liệu

const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateUser;



Để xây dựng một ứng dụng Node.js hoàn chỉnh với các yêu cầu trên (sử dụng npx express-generator --view=hbs, Sequelize, PostgreSQL, và hỗ trợ resource đa ngôn ngữ), dưới đây là các bước chi tiết:

1. Khởi tạo dự án
bash
Sao chép mã
npx express-generator --view=hbs zta
cd zta
npm install
Cài đặt các thư viện cần thiết:

bash
Sao chép mã
npm install sequelize sequelize-cli pg pg-hstore i18n body-parser express-validator dotenv
2. Cấu trúc thư mục
Thêm cấu trúc thư mục để tổ chức code tốt hơn:

plaintext
Sao chép mã
zta/
├── bin/
├── config/
│   ├── config.json         # File cấu hình Sequelize
├── controllers/            # Xử lý logic ứng dụng
├── middleware/             # Middleware (auth, validation, etc.)
├── models/                 # Sequelize models
├── public/
├── routes/                 # Routes chính của ứng dụng
├── translations/           # Resource đa ngôn ngữ
│   ├── en.json
│   ├── vi.json
├── views/
└── .env                    # Cấu hình môi trường
3. Cấu hình Sequelize
Khởi tạo Sequelize:

bash
Sao chép mã
npx sequelize-cli init
Cập nhật file config/config.json:

json
Sao chép mã
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "zta_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_username",
    "password": "your_password",
    "database": "zta_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_username",
    "password": "your_password",
    "database": "zta_prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
Tạo model ví dụ:

bash
Sao chép mã
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
Chạy migration:

bash
Sao chép mã
npx sequelize-cli db:migrate
4. Thêm i18n (đa ngôn ngữ)
Cấu hình i18n trong ứng dụng:

Tạo folder translations/ và các file en.json, vi.json.

en.json

json
Sao chép mã
{
  "welcome": "Welcome to ZTA!",
  "error_required": "This field is required."
}
vi.json

json
Sao chép mã
{
  "welcome": "Chào mừng đến với ZTA!",
  "error_required": "Trường này là bắt buộc."
}
Cài đặt i18n trong app.js:

javascript
Sao chép mã
const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/translations',
    defaultLocale: 'en',
    queryParameter: 'lang', // Chuyển ngôn ngữ qua query (e.g., ?lang=vi)
});

app.use(i18n.init);
Trong các views, dùng:

html
Sao chép mã
<h1>{{__('welcome')}}</h1>
5. Middleware xử lý validate dữ liệu
Cài đặt express-validator để validate dữ liệu:

Middleware validate trong middleware/validateUser.js:

javascript
Sao chép mã
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateUser;
Sử dụng trong route routes/users.js:

javascript
Sao chép mã
const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');
const { User } = require('../models');

router.post('/', validateUser, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
6. Sử dụng Controller
Thay vì logic trong route, chuyển vào controller:

Controller controllers/userController.js:

javascript
Sao chép mã
const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
Route routes/users.js:

javascript
Sao chép mã
const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');
const userController = require('../controllers/userController');

router.post('/', validateUser, userController.createUser);

module.exports = router;
# 7. Cài đặt .env

require('dotenv').config();
```
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    // ...
};
```

Để xây dựng các trang login.hbs và main.hbs với chức năng đăng nhập, đăng xuất, quên mật khẩu, và đăng nhập nhanh bằng Gmail, chúng ta sẽ thực hiện các bước sau:

npm install passport passport-local passport-google-oauth20 express-session connect-flash bcrypt

# 3. Tích hợp Passport.js và Session

Cập nhật file app.js

# vorasoft

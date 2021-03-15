require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { CelebrateError } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const loginValidator = require('./middlewares/validators/loginValidator');
const registerValidator = require('./middlewares/validators/registerValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./config/index');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
};

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(helmet());

// ---Краш-тест сервера---

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);
app.use('/', router);

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof CelebrateError) {
    const message = err.details.get('body')
      ? err.details.get('body').details[0].message
      : err.details.get('params').details[0].message;
    return res.status(400).send({ message });
  }
  return res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);

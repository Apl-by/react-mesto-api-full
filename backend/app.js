const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { CelebrateError } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const authValidator = require('./middlewares/validators/authValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://apl-by.students.nomoreparties.space',
  'https://www.apl-by.students.nomoreparties.space',
  'http://apl-by.students.nomoreparties.space',
  'http://www.apl-by.students.nomoreparties.space',
  'http://localhost:3001',
  'http://localhost:3000',
];

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

app.use(bodyParser.json());
app.use(helmet());

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', authValidator, login);
app.post('/signup', authValidator, createUser);
app.use('/', router);

app.use(errorLogger);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: err.details.get('body').details[0].message });
  }
  return res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);

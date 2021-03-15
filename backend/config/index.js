const { JWT_SECRET = 'dev-secret', ADMIN_ID, NODE_ENV } = process.env;

const allowedCors = NODE_ENV === 'production'
  ? [
    'https://apl-by.students.nomoreparties.space',
    'https://www.apl-by.students.nomoreparties.space',
    'http://apl-by.students.nomoreparties.space',
    'http://www.apl-by.students.nomoreparties.space',
  ]
  : [
    'https://apl-by.students.nomoreparties.space',
    'https://www.apl-by.students.nomoreparties.space',
    'http://apl-by.students.nomoreparties.space',
    'http://www.apl-by.students.nomoreparties.space',
    'http://localhost:3001',
    'http://localhost:3000',
  ];

module.exports = { JWT_SECRET, ADMIN_ID, allowedCors };

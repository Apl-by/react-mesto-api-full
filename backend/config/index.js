const { JWT_SECRET = 'dev-secret', ADMIN_ID, NODE_ENV } = process.env;

const allowedCors = NODE_ENV === 'production'
  ? [
    'https://mesto.apl-by.ru',
    'http://mesto.apl-by.ru',
  ]
  : [
    'https://mesto.apl-by.ru',
    'http://mesto.apl-by.ru',
    'http://localhost:3001',
    'http://localhost:3000',
  ];

module.exports = { JWT_SECRET, ADMIN_ID, allowedCors };

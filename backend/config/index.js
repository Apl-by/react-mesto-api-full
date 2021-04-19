const { JWT_SECRET = 'dev-secret', ADMIN_ID, NODE_ENV } = process.env;

const allowedCors = NODE_ENV === 'production'
  ? [
    'https://mesto.apl-by.site',
    'http://mesto.apl-by.site',
  ]
  : [
    'https://mesto.apl-by.site',
    'http://mesto.apl-by.site',
    'http://localhost:3001',
    'http://localhost:3000',
  ];

module.exports = { JWT_SECRET, ADMIN_ID, allowedCors };

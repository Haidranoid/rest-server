// Port (Heroku set a default port)
process.env.PORT = process.env.PORT || 3000;

// Node environment (Heroku set it to Production)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Expires in Token 30 days
process.env.EXPIRES_IN = 60 * 60 * 24 * 30;

// Authentication Seed
process.env.SECRET_KEY = process.env.HEROKU_SECRET_KEY || 'secret-development';

// Data Base Connection
process.env.CONNECTION_STRING = process.env.NODE_ENV !== 'dev' ? process.env.HEROKU_CONNECTION_STRING : 'mongodb://localhost/coffee';

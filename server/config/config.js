// Port (Heroku set a default port)
process.env.PORT = process.env.PORT || 3000;

// Node environment (Heroku set it to Production)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Expires in Token 3 days
process.env.EXPIRES_IN = '72h';

// Authentication Seed
process.env.SECRET_KEY = process.env.HEROKU_SECRET_KEY || 'secret-development';

// Data Base Connection
process.env.CONNECTION_STRING = process.env.NODE_ENV !== 'development' ? process.env.HEROKU_CONNECTION_STRING : 'mongodb://localhost/coffee';

// Google Client ID
process.env.GOOGLE_CLIENT_ID = process.env.HEROKU_GOOGLE_CLIENT_ID || '87153146962-sjmk25mnuv3o23mes72jnduvpitavgtm.apps.googleusercontent.com';

// DigitalOcean Spaces
process.env.SPACES_NAME = 'rest-server-coffe';
process.env.SPACES_SERVER = 'sfo2.digitaloceanspaces.com';
process.env.SPACES_ENDPOINT = 'https://rest-server-coffe.sfo2.digitaloceanspaces.com';
process.env.SPACES_KEY = process.env.HEROKU_SPACES_KEY || 'KS6HOOEB62BKNM2SOEOY';
process.env.SPACES_SECRET = process.env.HEROKU_SPACES_SECRET || '4Zz7t4rR2QHByZXmx1ck6QKG04nKlhz9vZZ0GbS2qyM';

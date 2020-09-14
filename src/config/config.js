// Google Client ID
process.env.GOOGLE_CLIENT_ID = '87153146962-sjmk25mnuv3o23mes72jnduvpitavgtm.apps.googleusercontent.com';

// server endopint
process.env.ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rest-server-coffe.herokuapp.com';
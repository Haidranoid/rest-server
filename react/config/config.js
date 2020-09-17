// server endpoint
process.env.URL_API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://rest-server-coffe.herokuapp.com/api';

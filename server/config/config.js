// PORT
process.env.PORT = process.env.PORT || 3000;

// NODE_ENV

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// Data Base

let connectionString;

if (process.env.NODE_ENV === 'dev'){
    connectionString = 'mongodb://localhost/coffee'
}else {
    connectionString = 'mongodb+srv://root:root@coffe.nrgf3.mongodb.net/coffe'
}

process.env.CONNECTION_STRING = connectionString;

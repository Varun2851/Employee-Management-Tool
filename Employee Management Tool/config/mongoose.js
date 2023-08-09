const mongoose = require('mongoose'); //require the library
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db'); //connect to database

const db = mongoose.connection;  //acquire the connection to check if it is successfull

db.on('error',console.error.bind(console,"error connecting to db"));  //error

//up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
});
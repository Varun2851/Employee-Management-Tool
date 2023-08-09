const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express(); //typically used in a Node.js application that utilizes the Express.js framework.

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //It sets the path to the directory that contains the views or templates for the application.
app.use(express.urlencoded()); // parser , middleware , middleware is simply a function which also has access to your respnse
//your request , it can analyze and process the data present in the response 
app.use(express.static('assets'));
var ContactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Tom Cruise",
        phone: "12131321321"
    }
]

// app.get('/practice', function(req, res){
//     return res.render('practice', {
//         title: "Let us play with ejs"
//     });
// });
 

app.get('/', function(req, res){

    // Assuming Contact is your Mongoose model
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        });
    })
    .catch(err => {
        console.log("Error in fetching Contact from db:", err);
    });
});
// app.post('/create-contact', function(req, res){
    
//     // contactList.push({
        
//     //     name: req.body.name,
//     //     phone: req.body.phone,
//     // })
//     ContactList.push(req.body);
//     return res.redirect('/');

// });

app.post('/create-contact', function(req, res) {
    // let contactExists = false;
    // for (let i = 0; i < ContactList.length; i++) {
    //     if (ContactList[i].name === req.body.name && ContactList[i].phone === req.body.phone) {
    //         contactExists = true;
    //         break;
    //     }
    // }
    
        //ContactList.push(req.body); 
        Contact.create({
            name : req.body.name,
            phone : req.body.phone

        })
        .then(newContact => {
            console.log('Contact-Created',newContact);
            return res.redirect('back');
        })
        .catch(err =>{
            console.error('Error creating Contact',err);
    
        });
});


app.get('/delete-contact/',function(req,res){
    //get the id from query in thr ul
    console.log(req.query);
    let id = req.query.id;
    //find the contact in the database and delete it 
    // Contact.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log('error in deleting from database');
    //         return;
    //     }
    //     return res.redirect('back');
    // });

    // Assuming Contact is your Mongoose model
    Contact.findByIdAndDelete(id)
        .exec()
        .then(() => {
             return res.redirect('back');
        })
        .catch(err => {
            console.log('Error in deleting from database:', err);
        });

    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex,1);
    // } 
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
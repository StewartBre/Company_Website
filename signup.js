var express = require('express')

var app = express();
var sqlite3 = require('sqlite3').verbose();

// persistent file database "myDB".
var db = new sqlite3.Database(':memory:');

//now any files in public are routed
app.use(express.static('public_html'));

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

db.serialize(function() {

    db.run("CREATE TABLE IF NOT EXISTS User (username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)");
    
    db.run("DELETE FROM User");
     });
    
    db.close();
    
    console.log("Database 'myDB' created");
// REST endpoint for posting a new user
app.post('/signup', function (req, res, next) {
    let username = req.body.username;
    let email = req.body.inputEmail
    let password = req.body.inputpassword;
    
    
    console.log("Just received POST data for users endpoint!");
    console.log(`Data includes: ${username}, ${email} ,${password}`);

    //insert the form data into the table User
    var stmt = db.run(`INSERT INTO User VALUES ("${username}","${email}","${password}")`);

    // still display the default web page in public folder, i.e. index.html, for next data entering 
    res.status(200).redirect('/index.html');  
});

// REST endpoint for getting all user data
app.get('/signup', function (req, res) {
    let html = '';

    // Display a web page table
    
    html += '<!doctype html><html lang="en">';
    html += '<head>';
    html += '<title>Geelong Pet Supplies Signup Information</title>';
    html += '<meta charset="utf-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    html += '<link rel="stylesheet"';
    html += '  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"';
    html += '  integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"';
    html += '  crossorigin="anonymous">';
    html += '</head>';

    html += '<body><div class="container">';
    html += '<h3> Your Signup Information </h3>';
    html += '<table class="table">';
    html += '<thead class="thead-dark"><tr>';
    html += '<th>Name</th><th>Email</th><th>Password</th>';
    html += '<tr></thead><tbody>';
    // Retrieve data from table User on the server 
    // and display it in a web page table structure
    db.all('SELECT * FROM User', function(err, rows){
        if (err) {
            return console.error(err.message);
        }
        if (rows.length === 0) { 
            console.log("Array is empty!") 
            html += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
            rows.forEach(function (row){
                html += '<tr>';
                html += '<td>'+row.username+'</td>';
                html += '<td>'+row.email+'</td>';
                html += '<td>'+row.password+'</td></tr>';
            });
        }

        html += '</tbody></table>';
        html += '</div>';
        html += '</body></html>';
        res.send( html );
    });
});

// create a Node.js server that listens on port 3000.
app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
})












const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'join_us',
    password : 'May@2020'
  });

app.get('/', (req, res) =>{
    var q = 'SELECT COUNT(*) as count from users';
    connection.query(q, (error, results) =>{
        if (error) throw error;
        console.log(results);
        res.render('home', {count: results[0].count});
    });
});

app.post('/register', (req, res)=>{
    var person = {
        email: req.body.email
    };

    //var q = 'INSERT INTO users (email) VALUES (' + req.body.email + ')';
    connection.query('INSERT INTO users SET?', person, (error, result)=>{
        if (error) throw error;
        console.log(result);
        res.redirect('/');
        //res.send('Thanks for joining our wait list!')
    });
});

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/joke', (req, res) => {
    var joke = 'What do you call a dog that does magic tricks? <em>A labracadabrador</em>';
    res.send(joke);
    console.log('Requested the joke route!');
});

app.get('/random_number', (req, res) => {
    var num = Math.floor((Math.random() * 10) + 1);
    res.send('You lucky number is ' + num);
});
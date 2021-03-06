const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');

//HEROKU PORT
const port = process.env.PORT || 3000;

var app = express();

//indique le repertoire des composants réutilisables
hbs.registerPartials(__dirname + "/views/partials");
//helpers sont accessibles par toutes les vues
hbs.registerHelper('year', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
})
// indique à express le moteur de rendu (template) à utiliser.
app.set('view engine', 'hbs');


// MIDDLEWARES

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}\r\n`;
    fs.appendFile("./server.log", log, (err) => {
        if (err) console.log("impossible de se connecter au fichier server.log")
    });
    next();
})

app.use((req, res, next) => {

    if (req.url === '/about' || req.url === '/help.html') {
        res.render('maintenance', { title: 'site en maintenance', message: 'Merci de patienter' })
    } else {
        next();
    }
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + "/public"));


// ROUTES
app.get('/', (req, res) => {
    //res.send('Bienvenue sur mon server ! ')
    res.render('home.hbs', {
        title: 'Home Page',
        message: 'Bienvenu sur le site de jean marc'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page',
        message: "Vous désirez des infos ?"
    });
})

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        title: 'project page',
        message: "Bienvenu sur mon portfolio"
    });
})

app.get('/test/:name', (req, res) => {

    let name = req.params.name;
    res.render('test.hbs', {
        title: 'Test page',
        message: `vous êtes ${name}`
    });
})

app.post('/test', (req, res) => {

    let fname = req.body.firstName;
    let name = req.body.name;

    fname == '' || fname == undefined ? fname = "un inconnu" : fname = fname;
    res.render('test.hbs', {
        title: 'Test page',
        message: `vous êtes ${fname} ${name}`
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "une erreur est survenue !"
    })
})

app.get("/users", (req, res) => {
    let userArray = [
        { name: 'jean marc', age: 46 },
        { name: 'didier', age: 51 },
        { name: 'erine', age: 8 }
    ];

    res.status(324).send(userArray);
})

app.listen(port, () => {
    console.log("le server est lancé sur le port : " + port);
});
module.exports.app = app;
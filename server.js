const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
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

app.use(express.static(__dirname + "/public"));


// ROUTES
app.get('/', (req, res) => {
    //res.send('Bienvenue sur mon server ! ')
    res.render('home.hbs', {
        title: 'Home Page',
        intro: 'Bienvenu sur le site de jean marc'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "une erreur est survenue !"
    })
})

app.listen(3000, "localhost", () => {
    console.log("le server est lancé");
});

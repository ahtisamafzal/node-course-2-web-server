const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'maintenance page',
//     maintenanceMsg: 'Website is down for maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name : 'Ahtisam',
  //   dob : 22-08-1979
  // })
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMsg: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>Hello Express!<br/>About page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
})

app.get('/bad', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    url: '/bad',
    errorMessage: 'invalid request'
  })
});

app.listen(3000, () => {
  console.log('Server is up & running on localhost port :3000');
});

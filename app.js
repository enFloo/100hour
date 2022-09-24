const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
// const router = require('./routes/auth')

//Load config 
dotenv.config({ path: './config/config.env'});

//passport config
require('./config/passport')(passport)



//root views directory to public
app.set('views', './public/views');

//declaring static directory
app.use(express.static('public'));


//connect database
connectDB()

// use morgan logger in dev mode
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
//setting the view engine with express-handlebars
app.engine('hbs', engine({extname: ".hbs", defaultLayout: "main", layoutsDir: "public/views/layouts",}));
app.set('view engine', '.hbs');

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  
}))

app.use(passport.authenticate('session'));


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index'));
 
const PORT = process.env.PORT || 3000;



//setting home route
app.get('/', function(req, res) {
  res.render('./main');
});

//setting auth/google route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));


//setting /auth/auth/google/callback route
app.get('/auth/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

//setting /auth/logout route
app.get('/auth/logout', function (req, res) {
  req.logout()
  res.redirect('/')
});


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
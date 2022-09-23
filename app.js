const express = require('express');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

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
app.use('/auth/google', require('./routes/auth'));



 
const PORT = process.env.PORT || 3000;



//setting home route
app.get('/', function(req, res) {
  res.render('./main');
});

//google auth route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
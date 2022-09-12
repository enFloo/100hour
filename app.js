const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

//Load config 
dotenv.config({ path: './config/config.env'});

//setting the view engine at EJS
app.set('view engine', 'ejs');

//root views directory to public
app.set('views', 'public');

//declaring static directory
app.use(express.static('public'));


//connect database
connectDB()



// use morgan logger in dev mode
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000;



//setting home route
app.get('/', function(req, res) {
  res.render('./pages/index');
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
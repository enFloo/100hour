const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

//Load config 
dotenv.config({ path: './config/config.env'});



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

//Routes
app.use('/', require('./routes/index'));



 
const PORT = process.env.PORT || 3000;



//setting home route
app.get('/', function(req, res) {
  res.render('./main');
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
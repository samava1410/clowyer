const express = require('express');

const routes = require('./routes/api');
const lawyer = require('./routes/lawyer');
const client = require('./routes/client');
const caseCourt = require('./routes/case');
const document = require('./routes/document');
const court = require('./routes/court');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const app = express();


//-----------------------------------Static-----------------------------------
app.use(express.static(__dirname + '/public'));
//-----------------------------------Body-Parser-----------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//-----------------------------------Mongoose-----------------------------------
mongoose.connect(process.env.MONGODB_URI||'mongodb://localHost/clowyer');
mongoose.Promise = global.Promise;
//-----------------------------------Session-----------------------------------
app.use(session({secret:'njaksdnkjas89as98dasdn899asuidna898627ajdb', resave: false,
 saveUninitialized: true
}));
//-----------------------------------Cooki-Parser-----------------------------------
app.use(cookieParser());
//-----------------------------------Views-----------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//-----------------------------------Helmet-----------------------------------
app.use(helmet());
app.disable('x-powered-by');
//-----------------------------------Rutas-----------------------------------
app.use(routes);
app.use(lawyer);
app.use(client);
app.use(caseCourt);
app.use(document);
app.use(court);
//-----------------------------------Error-----------------------------------
app.use(function(err, req, res, next){
	console.log({error: err.message});
	res.send({
		error: err.message
	});
});
//-----------------------------------Listen-Port-----------------------------------
app.listen(process.env.PORT || 4000, function(){
	console.log('Esperando por request puerto 4000');
});
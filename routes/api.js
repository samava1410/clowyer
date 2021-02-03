/*aqui se accede a las variables necesarias de cada modelo creado*/
const express = require('express');
const Lawyer = require('../models/lawyer');
const Client = require('../models/client');
const Case = require('../models/case');	
const Document = require('../models/document');
const Court = require('../models/court');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

//------------------------------------Navigation - web-----------------------------------------
/*router sirve para enrutar la aplicacion */
router.get('/', function(req, res, next) {
	res.render('index');
});
/*aqui se enruta al login del abogado
* ahi se permite buscar un abogado por medio del email y
* compara la contraseña para autorizar el acceso a la
* aplicacion*/
router.post('/login-lawyer', function(req, res, next) {
	if(req.body){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
			if(Lawyer){
				bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
					Lawyer.password = req.body.password;
					if(err){
						res.send('Error de contraseña');
					}
					if(result){
						res.json({'Lawyer' : Lawyer});
					}
				});
			}else{
				res.send('No se encontro el correo');
			}
		});
	}else{
		res.send('Faltan datos');
	}
});
/*aqui se enruta al login del abogado
* ahi se valida si un abogado existe o no
* o si hacen falta campos */
router.post('/login-lawyer-web', function(req, res, next) {
	if(req.body){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
			if(Lawyer){
				bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
					if(err){
						res.redirect('/login');
					}
					if(result){
						req.session.lawyer = Lawyer;
						req.session.lawyer.password = req.body.password;
						res.redirect('/main');
					}else{
						res.render('login', {Email: false, Password: true, Empty: false});
					}
				});
			}else{
				console.log('No se encontro el correo');
				res.render('login', {Email: true, Password: false, Empty: false});
			}
		});
	}else{
		console.log('Faltan datos');
		res.render('login', {Email: false, Password: false, Empty: true});
	}
});
/*aqui se enruta al login inicial*/
router.get('/login', function(req, res, next) {
	if(req.session.lawyer != null){
    	res.redirect('/main');
    }else{
    	res.render('login', {Email: false, Password: false, Empty: false});
    }
});
/*aqui se enruta al registro*/
router.get('/register', function(req, res, next) {
	res.render('register');
});
/*aqui se enruta al main de la aplicacion
* y permite buscar caso, cliente y juzgado*/
router.get('/main', function(req, res, next) {
    if(req.session.lawyer != null){
    	Case.find({idLawyer: req.session.lawyer._id}).then(function(Cases){
    		Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
    			Court.find({}).then(function(Court){
    				res.render('main',{Case: Cases, Client: Client, Court: Court,
    				 Lawyer: req.session.lawyer});		
				});
			});
		});		
    }else{
    	res.redirect('/');
    }
});
/*aqui se enruta la busqueda de caso por identificador*/
router.get('/details/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		req.session.temporalCase = Case;
		res.redirect('/details');
	});
});
/*aqui se enruta la busqueda de documento por numero de caso,
* cliente por identificador y tribunal*/
router.get('/details', function(req, res, next) {
	if(req.session.lawyer != null){
    	Document.find({caseNumber: req.session.temporalCase.number}).then(function(Document){
	    	Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
	    		Court.find({}).then(function(Court){
	    			res.render('case',{Case: req.session.temporalCase, Client: Client,
	    			 Court: Court, Document: Document});
				});
			});
		});	
    }else{
    	res.redirect('/');
    }
});
/*aqui se enruta a la salida de la aplicacion */
router.get('/exit', function(req, res, next) {
	req.session.lawyer = null;
	res.redirect('/');
});
/*permite exportar la funcion router , que permite el direccionamiento a traves de la aplicacion*/
module.exports = router;
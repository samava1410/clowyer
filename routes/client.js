/*se accede a las variables necesarias de cada modelo creado*/
const express = require('express');
const Client = require('../models/client');

const router = express.Router();

//-----------------------------------------Client------------------------------------------------
/*aqui se definen las rutas posibles dentro de cliente
* ya sea para buscar cada cliente,
* buscar cliente por identificador.
* Ademas permite hacer la peticion de crear, eliminar, ver  y modificar un cliente */

router.get('/client', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.json({'Client' : Client});
	});
});

router.get('/client-web', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.send(Client);
	});
});

router.get('/client/:idLawyer', function(req, res, next) {
	Client.find({idLawyer: req.params.idLawyer}).then(function(Client){
		res.json({'Client' : Client});
	});
});

router.get('/client-web/:idLawyer', function(req, res, next) {
	Client.find({idLawyer: req.params.idLawyer}).then(function(Client){
		res.send(Client);
	});
});

router.get('/specific-client/:id', function(req, res, next) {
	Client.findOne({_id: req.params.id}).then(function(Client){
		res.json({'Client' : Client});
	});
});

router.get('/specific-client-web/:id', function(req, res, next) {
	Client.findOne({_id: req.params.id}).then(function(Client){
		res.send(Client);
	});
});

router.post('/client', function(req, res, next) {
	Client.create(req.body).then(function(Client){
		res.send(Client);
	}).catch(next);
});

router.post('/client-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Client.create(req.body).then(function(Client){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/client/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		 res.send({Client});
	});
});

router.delete('/client-web/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		res.redirect('/main');
	});
});

router.put('/client/:id', function(req, res, next){
	Client.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Client){
		res.send(Client);
	});
});

router.put('/client-web/:id', function(req, res, next){
	Client.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Client){
		res.redirect('/main');
	});
});

module.exports = router;
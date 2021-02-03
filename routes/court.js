/*aqui se accedes a las variables necesarias creadas a partir del modelo*/
const express = require('express');
const Court = require('../models/court');

const router = express.Router();

//-----------------------------------------Court------------------------------------------------
/*aqui se definen las rutas posibles dentro de tribunal
* ya sea para buscar cada tribunal,
* buscar tribunal por identificador.
* Ademas permite hacer la peticion de crear, eliminar, ver  y modificar un tribunal*/
router.get('/court', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.send(Court);
	});
});

router.get('/court/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.send(Court);
	});
});

router.post('/court', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.send(Court);
	}).catch(next);
});

router.post('/court-web', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/court/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.send({Court});
	});
});

router.delete('/court-web/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.redirect('/main');
	});
});

router.put('/court/:id', function(req, res, next){
	Court.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Court){
		res.send(Court);
	});
});

router.put('/court-web/:id', function(req, res, next){
	Court.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Court){
		res.redirect('/main');
	});
});

module.exports = router;
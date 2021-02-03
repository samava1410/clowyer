/*aqui se accede a las variables*/
const express = require('express');
const Case = require('../models/case');
const Document = require('../models/document');

const router = express.Router();
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});
//----------------------------------------Case-----------------------------------------------
/*aqui se definen las rutas posibles dentro de caso
* ya sea para buscar cada caso,
* buscar caso por identificador.
* Ademas permite ahcer la peticion de crear, eliminar, ver  y modificar un caso */

router.get('/case', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.get('/case-web', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.send(Case);
	});
});

router.get('/case/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.post('/case', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.send(Case);
	}).catch(next);
});

router.post('/case-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Case.create(req.body).then(function(Case){
		res.redirect('/main');
	});
	if (next) {
			res.redirect('/main');
	}
});

router.delete('/case/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.send({Case});
	});
});

router.delete('/case-web/:id', function(req, res, next){
	Case.findOne({_id: req.params.id}).then(function(Cases){
		Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){});
		Document.find({caseNumber: Cases.number}).then(function(Documents){
			for(var i=0; i < Documents.length; i++) {
				Document.findByIdAndRemove({_id: Documents[i]._id}).then(function(Document){
					cloudinary.v2.uploader.destroy(Documents[i].documentName, function(error, result) {
						console.log(result);
					});
				});
			}
			res.redirect('/main');
		});
	});
});

router.put('/case/:id', function(req, res, next){
	Case.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Case){
		 res.json({'Case' : Case});
	});
});

router.post('/case-web-update/', function(req, res, next){
	req.body.idLawyer = req.session.lawyer._id;
	Case.findByIdAndUpdate(req.session.temporalCase._id, req.body, (err, todo) => {}).then(function(Case){
		req.session.temporalCase = Case;
		 res.redirect('/details');
	});
});

module.exports = router;
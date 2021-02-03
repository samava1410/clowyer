/*aqui se accede a las variables necesarias*/
const express = require('express');
const Document = require('../models/document');
const path = require('path');
const fs = require('fs');
var util = require('util')
var multer = require('multer')({
   dest: 'public/uploads'
});

const router = express.Router();
/*cloudinary permite la manipulacion de imagenes y videos para aplicaciones de la mejor calidad */
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

//-----------------------------------------Document------------------------------------------------
/*aqui se definen las rutas posibles dentro de un documento
* ya sea para buscar cada documento,
* buscar un documento por numero de caso.
* Ademas permite hacer la peticion de crear, eliminar, ver  y modificar un documento*/
router.get('/document', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.send(Document);
	});
});

router.get('/document/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.send(Document);
	});
});

router.post('/document', function(req, res, next) {
	Document.create(req.body).then(function(Document){
		res.send(Document);
	}).catch(next);
});

router.post('/document-web-main', [multer.single('url')], function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
	cloudinary.v2.uploader.upload('public/uploads/' + req.file.originalname,{ resource_type: "auto" }, 
		function(error, result) { 
			if (error) {
				console.log(error);
			}else{
				req.body.url = result.secure_url;
				req.body.documentName = result.public_id;
				fs.unlinkSync('public/uploads/' + req.file.originalname);
				Document.create(req.body).then(function(Document){
					res.redirect('/main');
				}).catch(next);
			}
	});
});

router.post('/document-web-case', [multer.single('url')], function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
	cloudinary.v2.uploader.upload('public/uploads/' + req.file.originalname,{ resource_type: "auto" }, 
		function(error, result) { 
			if (error) {
				console.log(error);
			}else{
				req.body.url = result.secure_url;
				req.body.documentName = result.public_id;
				fs.unlinkSync('public/uploads/' + req.file.originalname);
				Document.create(req.body).then(function(Document){
					res.redirect('/details');
				}).catch(next);
			}
	});
});
/*permite reestablecer el nombre del documento*/
function storeWithOriginalName (file) {
  var fullNewPath = path.join(file.destination, file.originalname)
  var rename = util.promisify(fs.rename)
  return rename(file.path, fullNewPath)
    .then(() => {
      return file.originalname
    })
}

router.delete('/document/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		cloudinary.v2.uploader.destroy(Document.documentName, function(error, result) {
			console.log(result);
		});
		 res.send(Document);
	});
});

router.delete('/document-web/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		cloudinary.v2.uploader.destroy(Document.documentName, function(error, result) {
			console.log(result);
		});
		 res.redirect('/main');
	});
});

router.put('/document/:id', function(req, res, next){
	Document.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Document){
		res.send(Document);
	});
});

router.put('/document-web/:id', function(req, res, next){
	Document.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(function(Document){
			res.redirect('/main');
	});
});

module.exports = router;
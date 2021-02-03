/*En este fichero, se crea el modelo de datos para cada cliente,
* el cual se compone de:
	* identificacion de tipo string
* nombre de tipo string
* tipo de tipo string
* fecha tipo date
* telefono de tipo string
* id de abogado de tipo string*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*Creacion del esquema que define el  modelo propuesto anteriormente*/
var ClientSchema = new Schema({
	identification:{
		type: String,
		required: [true, 'Identification client is required'],
		unique: [true, 'Identification has already taken']
	},
	name:{
		type: String,
		required: [true, 'Name client is required']
	},
	type:{
		type: String,
		required: [true, 'Type client is required']
	},
	date:{
		type:Date,
		required: [false, 'Date client is required']
	},
	phone:{
		type:String,
		required: [true, 'Phone client is required']
	},
	idLawyer:{
		type:String,
		required: [false, 'Id Lawyer of Document is required']	
	}
});

const Client = mongoose.model('client', ClientSchema);
module.exports = Client;
/*En este fichero, se crea el modelo de datos para cada cliente,
* el cual se compone de:
* nombre de tipo string
* direccion de tipo string
* tipo de tipo string
* telefono de tipo string*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*Creacion del esquema que define el  modelo propuesto anteriormente*/
var CourtSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name Court is required']
	},
	address:{
		type: String,
		required: [false, 'Adress Court is required']
	},
	type:{
		type:String,
		required: [false, 'Type Court is required']
	},
	phone:{
		type:String,
		required: [false, 'Date Court is required']
	}
});

const Court = mongoose.model('court', CourtSchema);
module.exports = Court;
/*En este fichero, se crea el modelo de datos para cada cliente,
* el cual se compone de:
* identificacion de tipo string
* nombre de tipo string
* especialidad de tipo string
* telefono de tipo string
* email de tipo string
* password de tipo string
* avatar de tipo string
* imagen de tipo string*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*Creacion del esquema que define el  modelo propuesto anteriormente*/
var LawyerSchema = new Schema({
	identification:{
		type: String,
		required: [true, 'Identification lawyer is required'],
		unique: [true, 'Identification has already taken']
	},
	name:{
		type: String,
		required: [true, 'Name lawyer is required']
	},
	speciality:{
		type: String,
		required: [true, 'Speciality lawyer is required']
	},
	phone:{
		type:String,
		required: [true, 'Phone lawyer is required']
	},
	email:{
		type:String,
		required: [true, 'Email lawyer is required'],
		unique: [true, 'Email has already taken']	
	},
	password:{
		type:String,
		required: [true, 'Password lawyer is required']
	},
	avatar:{
		type:String,
		required: [false, 'Img lawyer is required']
	},
	imgName:{
		type:String,
		required: [false, 'Name Img lawyer is required']
	}
});
const Lawyer = mongoose.model('lawyer', LawyerSchema);
module.exports = Lawyer;
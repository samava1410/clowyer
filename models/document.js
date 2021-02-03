/*En este fichero, se crea el modelo de datos para cada cliente,
* el cual se compone de:
* nombre de tipo string
* tipo de tipo string
* numero de caso de tipo string
* id de abogado de tipo string
* url de tipo string
* nombre de documento de tipo string*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*Creacion del esquema que define el  modelo propuesto anteriormente*/
var DocumentSchema = new Schema({
	name:{
		type: String,
		required: [true, 'Name Document is required']
	},
	type:{
		type:String,
		required: [true, 'Type Document is required']
	},
	caseNumber:{
		type:String,
		required: [true, 'Case number of Document is required']
	},
	idLawyer:{
		type:String,
		required: [false, 'Id Lawyer of Document is required']	
	},
	url:{
		type:String,
		required: [true, 'Url Document is required']		
	},
	documentName:{
		type:String,
		required: [true, 'Document Name uploaded is required']		
	}
});

const Document = mongoose.model('document', DocumentSchema);
module.exports = Document;
const mongoose = require('mongoose');
const expect = require('chai').expect;
const ClientSchema = require('../models/client');
const CourtSchema = require('../models/court');

mongoose.connect('mongodb://localhost/clowyer',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(db => console.log('Conectado a la BD CLOWYER'))
.catch(err => console.log('Problemas de conexion de bases de datos' + err));
mongoose.Promise = global.Promise;

var idTE = Math.round(Math.random() * (1000000 - 100000) + 100000);
//escenario
//Se prepara la prueba
function escenario1() {
    idTE = String(idTE)
    clientNew = {
        "identification": idTE,
        "name": "Juan",
        "type": "N",
        "date": "2020-02-06T00:00:00.000+00:00",
        "phone": "31292992",
        "idLawyer": "5e4f358081ffcb2560ee8082"
    }
    const clienteTemp = new ClientSchema(clientNew);
    clienteTemp.save();
}
//PRUEBA UNITARIA
describe("Agregar Cliente", function () {
    it('deberia agregar un cliente', async function () {
        escenario1();
        var clienteFind = await ClientSchema.find();
        var clienteFind = await ClientSchema.find();
        const indice = clienteFind.length - 1;
        expect(idTE).to.be.equal(clienteFind[indice].identification);
    });
});

//------------------
function escenario2() {
    idTE =  "Calle " + idTE; 
    courtNew = {
        "name": "camilo",
        "address": idTE,
        "type": "Penal",
        "phone": "6547892134",        
    }
    const courtTemp = new CourtSchema(courtNew);
    courtTemp.save();
}
//PRUEBA UNITARIA
describe("Agregar Juzgado", function () {
    it('deberia agregar un juzgado', async function () {
        escenario2();
        await ClientSchema.find();
        var courtFind = await CourtSchema.find();
        const indice = courtFind.length - 1;
        expect(idTE).to.be.equal(courtFind[indice].address);
    });
});
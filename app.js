"use strict";
const express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser');
const app = express();
let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


MongoClient.connect("mongodb://localhost:27017/notas", (err, database) => {

    if(err) throw err;

    db = database;

    app.listen(3000, () => {
        console.log("Puerto 3000: ");
    });

});

app.get('/notas', (request, response) => {

   db.collection('notas').find({}).toArray((err, docs) => {
       if (err) response.json({success: false, message: "No se pueden recuperar los datos"});
       response.json({success: true, notas: docs});
   })
});

app.post('/notas', (request, response) => {
    var nota = request.body;
    db.collection('notas').insert(nota, (err, result) => {
        if (err) response.json({success: false, message: "No se puedo agregar la nota"});
        console.log("Agregado " + JSON.stringify(result));
        response.json({success: true, message: "Una nueva nota ha sido agregada"});
    });
});

app.delete('/notas/:id', (request, response) => {
    var id = request.params.id;

    db.collection('notas').removeOne({_id: id}, (err, result) => {
        if (err) response.json({success: false, message: "No se puedo eliminar"});
        console.log("Se ha eliminado " + JSON.stringify(result));
        response.json({success: true, message: "Eliminado"});
    });
});

"use strict";

const express = require('express');
const mongo = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

mongo.connect("mongodb://localhost:27017/notas", (err, database) => {
  if (err) throw err;
  db = database;

  app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
  });
});

app.get('/notas', (req, res) => {
  db.collection('notas').find({}).toArray((err, docs) => {
    if(err) res.json({ hecho: false, mensaje: "No se pueden recuperar los datos" });
    res.json({ hecho: true, notas: docs })
  })
});

app.post('/notas', (req, res) => {
  var nota = req.body;

  db.collection('notas').insert(nota, (err, result) => {
    if(err) res.json({ hecho: false, mensaje: "No se puede agregar a la base de datos" });
    console.log("Agregado! " + JSON.stringify(result));
    res.json({ hecho: true, mensaje: "Nueva nota agregada!" });
  });
});

app.delete('/notas/:id', (req, res) => {
  var id = req.params.id;

  db.collection('notas').removeOn({ _id: id }, (err, result) => {
    if(err) res.json({ hecho: false, mensaje: "No se ha podido eliminar nota" });
    console.log("Eliminado " + JSON.stringify(result));
    res.json({ hecho: true, mensaje: "Ha sido eliminado" });
  });
});

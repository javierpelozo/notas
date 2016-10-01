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

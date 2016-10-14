(function () {
    "use strict";

    angular
        .module('notas')
        .controller('NotasController', ['apiService', 'colorService', NotasController]);


    function NotasController(apiService, colorService){

        var notas = this;

        notas.editor = {
            placeholder: "Ingrese una nueva nota..",
            text: ""
        };

        notas.items = [];

        apiService
            .get()
            .then(function(response){
                notas.items = response.data.notas;
            })
            .catch(function(error){
                console.log(error);
            });


        notas.eliminar = function(nota){

            notas.items.splice(notas.items.indexOf(nota), 1);

            apiService
                .eliminar(nota._id)
                .then(function(response){
                    console.log(response.data.message);
                })
                .catch(function(error){
                    console.log(error);
                });

        };

        notas.agregar = function(){

            var newNota = {
                _id: new Date(),
                text: notas.editor.text,
                color: colorService.getRandom()
            };

            if(notas.editor.text){

                notas.items.unshift(newNota);

                apiService
                    .post(newNota)
                    .then(function(response){
                        console.log(response.data.message);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                notas.editor.text = "";
            }

        };
    }
}());

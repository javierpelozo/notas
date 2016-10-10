(function() {
    "use strict";
    angular
        .module('notas')
        .controller('NotasController', ['apiService', 'colorService', NotasController]);

    function NotasController(apiService, colorService) {
        var notas = this;
        notas.editor = {
            text: ""
        };

        notes.items = [];

        apiService
            .get()
            .then(function(response) {
                notas.items = response.data.notas;
            })
            .catch(function(error) {
                console.log(error);
            });

        notas.delete = function(nota) {

            notas.items.splice(notas.items.indexOf(nota), 1);

            apiService
                .delete(nota._id)
                .then(function(response) {
                    console.log(response.data.message);
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        notas.add = function() {
            var nuevaNota = {
                id: new Date(),
                text: notes.editor.text,
                color: colorService.getRandom()
            };

            if (notas.editor.text) {
                notas.items.unshift(nuevaNota);

                apiService
                    .post(nuevaNota)
                    .then(function(response) {
                        console.log(response.data.message);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                notes.editor.text = "";
            }
        };
    }
}());

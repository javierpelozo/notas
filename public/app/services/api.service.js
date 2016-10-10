(function() {
    "use strict";

    angular
        .module('app')
        .factory('apiService', ['$http', apiServiceFactory]);

    function apiServiceFactory($http) {

        var notasEndpoint = '/notas';

        function mostrar() {
            return $http({
                method: 'GET',
                url: notasEndpoint
            });
        }

        function eliminar(id) {
            return $http({
                method: 'DELETE',
                url: notasEndpoint + "/" + id
            });
        }

        function agregar(nota) {
            return $http({
                method: "POST",
                url: notasEndpoint,
                data: nota
            })
        }

        return {
            get: mostrar,
            delete: eliminar,
            post: agregar
        }
    }
}());

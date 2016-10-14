(function () {
    "use strict";

    angular
        .module('app')
        .factory('apiService', ['$http', apiServiceFactory]);

    /**
     * @function apiServiceFactory that implements RESTful requests to the backend
     * @return Object with functionality methods
     */

    function apiServiceFactory($http){

        var notasEndpoint = '/notas';

        function getAll(){
            return $http({
                method: 'GET',
                url: notasEndpoint
            });
        }

        function eliminarExisting(id){
            return $http({
                method: 'DELETE',
                url: notasEndpoint + "/" + id
            });
        }

        function agregarNuevo(nota){
            return $http({
                method: "POST",
                url: notasEndpoint,
                data: nota
            })
        }

        return {
            get: getAll,
            eliminar: eliminarExisting,
            post: agregarNuevo
        }
    }
}());


(function () {
    "use strict";

    angular
        .module('app')
        .factory('apiService', ['$http', apiServiceFactory]);

    /**
     * @function apiServiceFactory that implements RESTful requests to the backend
     * @return Object with functionality methods
     */

    function apiServiceFactory($http){

        var notasEndpoint = '/notas';

        function getAll(){
            return $http({
                method: 'GET',
                url: notasEndpoint
            });
        }

        function eliminarExisting(id){
            return $http({
                method: 'DELETE',
                url: notasEndpoint + "/" + id
            });
        }

        function agregarNuevo(nota){
            return $http({
                method: "POST",
                url: notasEndpoint,
                data: nota
            })
        }

        return {
            get: getAll,
            eliminar: eliminarExisting,
            post: agregarNuevo
        }
    }
}());

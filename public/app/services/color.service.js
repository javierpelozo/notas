(function() {
    "use strict";

    angular
        .module('app')
        .factory('colorService', [colorServiceFactory]);


    function colorServiceFactory() {

        function getRandomColor() {
            var letras = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letras[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        return {
            getRandom: getRandomColor
        }
    }
}());

(function () {
    "use strict";

    angular
        .module('app')
        .factory('colorService', [colorServiceFactory]);


    function colorServiceFactory(){

        /**
         * @function For generation random color value
         * @return Object color (hex value)
         */
        function getRandomColor(){
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        return {
            getRandom: getRandomColor
        }
    }
}());

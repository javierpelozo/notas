(function() {
    "use strict";

    /**
    * @description masonry and masonry-note directives implement interactive animation
     *@link  http://masonry.desandro.com/ Masonry website
     *@link  https://github.com/klederson/angular-masonry-directive Masonry angular directive implementation
    */

    angular
        .module('notas')
        .directive('masonry', function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    var container = elem[0];
                    var options = angular.extend({
                        itemSelector: '.item'
                    }, angular.fromJson(attrs.masonry));

                    var masonry = scope.masonry = new Masonry(container, options);

                    var debounceTimeout = 0;
                    scope.update = function() {
                        if (debounceTimeout) {
                            $timeout.cancel(debounceTimeout);
                        }
                        debounceTimeout = $timeout(function() {
                            debounceTimeout = 0;

                            masonry.reloadItems();
                            masonry.layout();

                            elem.children(options.itemSelector).css('visibility', 'visible');
                        }, 120);
                    };

                    scope.removeBrick = function() {
                        $timeout(function() {
                            masonry.reloadItems();
                            masonry.layout();
                        }, 100);
                    };

                    scope.appendBricks = function(ele) {
                        masonry.appended(ele);
                    };

                    scope.$on('masonry.layout', function() {
                        masonry.layout();
                    });

                    scope.update();
                }
            };
    })
        .directive('masonryNota', function() {
            return {
                restrict: 'A',
                link: function(scope, elem) {
                    elem.css('visibility', 'hidden');
                    var master = elem.parent('*[masonry]:first').scope(),
                        update = master.update,
                        removeBrick = master.removeBrick,
                        appendBricks = master.appendBricks;
                    if (update) {
                        elem.ready(update);
                    }
                    if (appendBricks) {
                        appendBricks(elem)
                    }
                    scope.$on('$destroy', function() {
                        if (removeBrick) {
                            removeBrick();
                        }
                    });
                }
        };
    });
})();

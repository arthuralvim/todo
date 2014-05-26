(function(){
    var app = angular.module('todo', ['todo.services', 'todo.controllers', 'ui.bootstrap']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{_');
        $interpolateProvider.endSymbol('_}');
    });

    app.directive('todoList', [ '$http', '$location', '$log', 'TodoRUDFactory', 'TodoLCFactory', function($scope, $http, $location, TodoRUDFactory, TodoLCFactory){

        return {
            restrict: 'E',
            templateUrl: 'static/js/angular/views/todo-list.html',
            controller: function($http, $scope, $location, $log, TodoRUDFactory, TodoLCFactory){

                $scope.todolist = [];
                $scope.new_todo = {};

                $scope.detail = function (id) {
                  $location.path('/api/todo/' + id);
                };

                $scope.create = function () {
                    op = TodoLCFactory.create($scope.new_todo)
                    op.$promise.then(function (data) {
                        $log.info('Promise: ' + data);
                        todo.todolist.push(data);
                    }, function (data) {
                        $log.error('Problems: ' + data);
                    });
                    $scope.new_todo = {}
                };

                $scope.delete = function (id, index) {
                  op = TodoRUDFactory.delete({ id: id });
                  var idx = index;
                  op.$promise.then(function (data) {
                        $log.info('Promise: ' + data);
                        $scope.todolist.splice(idx, 1);
                    }, function (data) {
                        $log.error('Problems: ' + data);
                    });
                };

                op = TodoLCFactory.query()
                op.$promise.then(function (data) {
                    $scope.todolist = data;
                    $log.info('Promise: ' + data);
                }, function (data) {
                    $log.error('Problems: ' + data);
                });

            },
            controllerAs: 'todoCtrl'
        };
    }]);

})();

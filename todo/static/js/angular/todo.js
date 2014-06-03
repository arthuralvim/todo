(function(){
    var app = angular.module('todo', ['todo.services', 'todo.controllers', 'ui.bootstrap']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{_');
        $interpolateProvider.endSymbol('_}');
    });

    app.directive('todoList', [ '$log', 'TodoRUDFactory', 'TodoLCFactory', function($scope, $log, TodoRUDFactory, TodoLCFactory){

        return {
            restrict: 'E',
            templateUrl: 'static/js/angular/views/todo-list.html',
            controller: function($scope, $log, TodoRUDFactory, TodoLCFactory){

                $scope.todolist = [];
                $scope.new_todo = {};

                $scope.create = function () {
                    op = TodoLCFactory.create($scope.new_todo)
                    op.$promise.then(function (data) {
                        $log.info('Promise create: ' + data);
                        $scope.todolist.push(data);
                    }, function (data) {
                        $log.error('Problems create: ' + data);
                    });
                    $scope.new_todo = {}
                };

                $scope.delete = function (id, index) {
                  op = TodoRUDFactory.delete({ id: id });
                  var idx = index;
                  op.$promise.then(function (data) {
                        $log.info('Promise delete: ' + data);
                        $scope.todolist.splice(idx, 1);
                    }, function (data) {
                        $log.error('Problems delete: ' + data);
                    });
                };

                op = TodoLCFactory.query()
                op.$promise.then(function (data) {
                    $scope.todolist = data;
                    $log.info('Promise index: ' + data);
                }, function (data) {
                    $log.error('Problems index: ' + data);
                });

            },
            controllerAs: 'todoCtrl'
        };
    }]);

})();

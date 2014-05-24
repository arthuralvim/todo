(function(){
    var app = angular.module('todo', ['todo.services']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{_');
        $interpolateProvider.endSymbol('_}');
    });

    app.directive('todoList', [ '$http', '$location', 'TodoRUDFactory', 'TodoLCFactory', function($scope, $http, $location, TodoRUDFactory, TodoLCFactory){

        return {
            restrict: 'E',
            templateUrl: 'static/js/angular/views/todo-list.html',
            controller: function($http, $location, TodoRUDFactory, TodoLCFactory){

                var todo = this;
                todo.todolist = [];
                todo.new_todo = {};

                todo.detail = function (id) {
                  $location.path('/api/todo/' + id);
                };

                todo.create = function () {
                    op = TodoLCFactory.create(todo.new_todo)
                    op.$promise.then(function (data) {
                        console.log('Promise: ' + data);
                    });
                    debugger;
                  todo.new_todo = {}
                  todo.todolist = TodoLCFactory.query();
                };

                todo.delete = function (id) {
                  TodoRUDFactory.delete({ id: id });
                  todo.todolist = TodoLCFactory.query();
                };

                todo.update = function () {
                  TodoRUDFactory.update(todo.new_todo);
                  todo.todolist = TodoLCFactory.query();
                };

                todo.todolist = TodoLCFactory.query()

                todo.todolist.$promise.then(function (data) {
                    console.log('Promise: ' + data);
                });

            },
            controllerAs: 'todoCtrl'
        };
    }]);

})();

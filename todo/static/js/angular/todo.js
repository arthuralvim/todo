(function(){
    var app = angular.module('todo', ['todo.services']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{_');
        $interpolateProvider.endSymbol('_}');
    });

    app.directive('todoList', [ '$http', '$location', 'TodoListsFactory', 'TodoListFactory', function($scope, $http, $location, TodoListsFactory, TodoListFactory){

        return {
            restrict: 'E',
            templateUrl: 'static/js/angular/views/todo-list.html',
            controller: function($http, $location){

                var todo = this;
                todo.todolist = [];
                todo.new_todo = {};

                todo.detail = function (id) {
                  $location.path('/api/todo/' + id);
                };

                todo.create = function () {
                    debugger;
                  operation = TodoListsFactory.create(todo.new_todo);
                  todo.new_todo = {}
                  todo.todolist = TodoListsFactory.query();
                };

                todo.delete = function (id) {
                  TodoListFactory.delete({ id: id });
                  todo.todolist = TodoListsFactory.query();
                };

                todo.update = function () {
                  TodoListFactory.update(todo.new_todo);
                  todo.todolist = TodoListsFactory.query();
                };

                todo.todolist = TodoListsFactory.query();

            },
            controllerAs: 'todoCtrl'
        };
    }]);

})();

(function(){
    var app = angular.module('todo', []);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{_');
        $interpolateProvider.endSymbol('_}');
    });

    app.directive('todoList', [ '$http', '$location', 'TodoListsFactory',
                'TodoListFactory',
                function($http, $location, TodoListsFactory, TodoListFactory){
        return {
            restrict: 'E',
            templateUrl: 'static/js/angular/views/todo-list.html',
            controller: function($http, $location, TodoListsFactory,
                                 TodoListFactory){

                var todo = this;
                todo.todolist = [];

                /* callback for ng-click 'detail': */
                $scope.detail = function (id) {
                  $location.path('/api/todo/' + id);
                };

                /* callback for ng-click 'delete': */
                $scope.delete = function (id) {
                  TodoListFactory.delete({ id: id });
                  $scope.todolist = TodoListsFactory.query();
                };

                /* callback for ng-click 'update': */
                $scope.update = function (todo_obj) {
                  TodoListFactory.update(todo_obj);
                  $scope.todolist = TodoListsFactory.query();
                };

                $scope.todolist = TodoListsFactory.query();

            },
            controllerAs: 'todoCtrl'
        };
    }]);

})();



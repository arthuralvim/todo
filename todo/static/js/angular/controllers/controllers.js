
var app = angular.module('todo.controllers', []);

app.controller('ModalDemoCtrl', function ($scope, $modal, $log, TodoRUDFactory, TodoLCFactory) {

    $scope.todo_rud_factory = TodoRUDFactory;
    $scope.todo_lc_factory = TodoLCFactory;

    $scope.open = function (size, index) {
        $scope.todo_id = index;
        var modalInstance = $modal.open({
            templateUrl: 'static/js/angular/views/todo-modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                detail: function () {
                    return $scope.todo_rud_factory.show({id: $scope.todo_id});
                },
                factory_rud: function () {
                    return $scope.todo_rud_factory;
                },
                factory_lc: function () {
                    return $scope.todo_lc_factory;
                }
            }
        });

        modalInstance.result.then(function (todolist) {
            $scope.todolist = todolist
            $log.info('Modal finished at: ' + new Date());
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
});

app.controller('ModalInstanceCtrl', function ($scope, $log, $modalInstance, detail, factory_rud, factory_lc) {
    $scope.factory_lc = factory_lc;
    $scope.factory_rud = factory_rud;
    $scope.detail = detail;
    $scope.todo = {};

    $scope.ok = function () {
        op = $scope.factory_rud.update($scope.detail)
        op.$promise.then(function (data) {
            $log.info('Promise: ' + data);
        }, function (data) {
            $log.error('Problems: ' + data);
        });

        op = factory_lc.query()
        op.$promise.then(function (data) {
            $scope.todolist = data;
            $log.info('Promise: ' + data);
        }, function (data) {
            $log.error('Problems: ' + data);
        });

        $modalInstance.close($scope.todolist);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

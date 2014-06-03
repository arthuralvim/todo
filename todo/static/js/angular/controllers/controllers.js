
var app = angular.module('todo.controllers', []);

app.controller('ModalCtrl', function ($scope, $modal, $log, TodoRUDFactory, TodoLCFactory) {

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
                }
            }
        });

        modalInstance.result.then(function () {
            op = TodoLCFactory.query()
            op.$promise.then(function (data) {
                $log.info('Promise factory_lc: ' + data);
                $scope.$parent.todolist = data;
                $log.info('Modal finished at: ' + new Date());
            }, function (data) {
                $log.error('Problems factory_lc: ' + data);
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
});

app.controller('ModalInstanceCtrl', function ($scope, $log, $modalInstance, detail, factory_rud) {
    $scope.factory_rud = factory_rud;
    $scope.detail = detail;

    $scope.ok = function () {
        op = $scope.factory_rud.update($scope.detail)
        op.$promise.then(function (data) {
            $log.info('Promise update: ' + data);
            $modalInstance.close();
        }, function (data) {
            $log.error('Problems update: ' + data);
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

(function(){

    var services = angular.module('todo.services', ['ngResource']);

    services.factory('TodoListsFactory', function ($resource) {
        return $resource('/api/todo/', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        })
    });

    services.factory('TodoListFactory', function ($resource) {
        return $resource('/api/todo/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        })
    });

})();



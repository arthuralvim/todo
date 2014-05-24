(function(){

    var services = angular.module('todo.services', ['ngResource']);

    var baseUrl = 'http://localhost:8000';

    services.factory('TodoLCFactory', function ($resource) {
        return $resource(baseUrl+'/api/todo/ ', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST'}
        })
    });

    services.factory('TodoRUDFactory', function ($resource) {
        return $resource(baseUrl+'/api/todo/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        });
    });

})();



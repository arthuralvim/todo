(function(){

    var services = angular.module('todo.services', ['ngResource']);

    var baseUrl = 'http://localhost\\:8000';

    services.factory('TodoListsFactory', function ($resource) {
        return $resource(baseUrl+'/api/todo/', {}, {
            querya: { method: 'GET', isArray: true },
            createa: { method: 'POST'}
        });
    });

    services.factory('TodoListFactory', function ($resource) {
        return $resource(baseUrl+'/api/todo/:id', {}, {
            showa: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        });
    });

})();



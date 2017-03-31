export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    'use strict'
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/signin');
    $stateProvider.state('app', {
        url: '',
        abstract: true,
        template: '<ui-view></ui-view>'
    });
}]

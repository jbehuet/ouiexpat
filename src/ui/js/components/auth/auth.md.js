import auth from './auth.component';
import loginForm from './loginForm.component';
import registerForm from './registerForm.component';

const authModule = angular.module('ouiexpat.auth', [])
    .component('auth', auth)
    .component('loginForm', loginForm)
    .component('registerForm', registerForm)
    .config(['$stateProvider', ($stateProvider) => {
        'use strict'
        $stateProvider
            .state('auth', {
                url: '',
                abstract: true,
                template: '<auth></auth>'
            })
            .state('auth.signin', {
                url: '/signin',
                template: '<login-form></login-form>'
            })
            .state('auth.signup', {
                url: '/signup',
                template: '<register-form></register-form>'
            })
    }])
    .name

export default authModule

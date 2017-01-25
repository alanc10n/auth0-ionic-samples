(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService'];

  function HomeController($state, authService) {
    var vm = this;

    vm.auth = authService;
    vm.login = login;

    function login() {
      $state.go("login");
    }

  }

}());

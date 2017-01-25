(function () {

  angular
    .module('app', ['ionic', 'auth0.auth0', 'angular-jwt'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'angularAuth0Provider', 'jwtOptionsProvider'];

  function config($stateProvider, $urlRouterProvider, angularAuth0Provider, jwtOptionsProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html'
      });

    $urlRouterProvider.otherwise('/');

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token'
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });

  }

})();




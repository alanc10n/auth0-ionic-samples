(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', '$ionicPopup', 'angularAuth0', 'authManager'];

  function authService($state, $ionicPopup, angularAuth0, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login(username, password) {
      angularAuth0.client.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      }, onAuthenticated);
    }

    function signup(username, password) {
      angularAuth0.popup.signupAndLogin({
        connection: 'Username-Password-Authentication',
        email: username,
        password: password
      }, onAuthenticated);
    }

    function loginWithGoogle() {
      angularAuth0.popup.authorize({
        connection: 'google-oauth2',
        redirectUri: window.location.href
      }, onAuthenticated);
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      userProfile = {};
    }

    function onAuthenticated(error, authResult) {
      if (error) {
        return $ionicPopup.alert({
          title: 'Login failed!',
          template: error.description
        });
      }

      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);

      angularAuth0.client.userInfo(authResult.accessToken, function (error, profileData) {
        if (error) {
          return console.log(error);
        }
        localStorage.setItem('profile', JSON.stringify(profileData));
        userProfile = profileData;
        $state.go('home');
      });
    }

    function isAuthenticated() {
      return authManager.isAuthenticated();
    }

    return {
      login: login,
      logout: logout,
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      isAuthenticated: isAuthenticated
    }
  }
})();

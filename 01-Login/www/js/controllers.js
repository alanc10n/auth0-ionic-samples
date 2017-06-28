angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Auth) {
  $scope.auth = Auth;

  $scope.$evalAsync(function() {
    if (Auth.isAuthenticated()) {
      $scope.isAuthenticated = true;
    } else {
      $scope.isAuthenticated = false;
    }
  })
})

.controller('ProfileCtrl', function($rootScope, $scope, Auth) {
  $scope.auth = Auth;

  if (Auth.isAuthenticated()) {
    if (Auth.userProfile) {
      $scope.profile = Auth.userProfile;
    } else {
      
      Auth.getProfile(function(err, profile) {
        if (err) {
          return alert(err);
        }
        $scope.$evalAsync(function() {
          $scope.profile = profile;
        });
      });
    }
  }

});

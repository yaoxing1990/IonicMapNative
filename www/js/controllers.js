angular.module('starter.controllers', ['ngMap'])



.controller('MyController', function(NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.service('playlistService', function($stateParams, $http){
  items = [];
  $http({
    method: 'GET',
    url: 'http://localhost:3000/'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      capacity = response.data.length;
      for(let i = 0; i < response.data.length; i++) {
        items.push({latitude: response.data[i].latitude, longitude: response.data[i].longitude});
      }
      
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    this.getlongitude = function() {
      return items[$stateParams.playlistId].latitude;
    }
    this.getlatitude = function() {
      return items[$stateParams.playlistId].longitude;
    }
    this.getSize = function() {
      return items.length;
    }
})

.controller('PlaylistsCtrl', function($scope, playlistService, $http) {
  $scope.playlists = [];
  $http({
    method: 'GET',
    url: 'http://localhost:3000/'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      for(var i = 0; i < response.data.length; i++) {
        $scope.playlists.push({title: "Place " + i, id: i});
      }
      
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  
  
})

.controller('PlaylistCtrl', function($scope, playlistService) {
  $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?key=AIzaSyBFoU6fVQ7W9rA5sZ-fJSvyMI34FUwVBGQ";
  $scope.longitude = playlistService.getlongitude();
  $scope.latitude = playlistService.getlatitude();
})

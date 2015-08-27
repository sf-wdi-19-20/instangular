angular.module('instangular', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/search.html',
        controller: 'MainCtrl'
      })

      .when('/favorites', {
        templateUrl: 'templates/favorites.html',
        controller: 'FavoritesCtrl'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.photos = [];

    $scope.searchTag = function () {
      var tag = $scope.tag.replace(/\s+/, '');
      var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
      $http.jsonp(url)
        .then(function (response) {
          console.log(response.data.data);
          $scope.tag = '';
          $scope.photos = response.data.data;
        });
    };

    $scope.savePhoto = function (photo) {
      // check if localStorage.photos doesn't exist yet
      if (!localStorage.photos) {
        localStorage.photos = JSON.stringify([]);
      }

      // get existing favorites from localStorage.photos
      var allPhotos = JSON.parse(localStorage.photos);

      // push new favrotie into array of all photos
      allPhotos.push(photo);

      // reset localStorage.photos to updated array of all photos
      localStorage.photos = JSON.stringify(allPhotos);
    };
  }])

  .controller('FavoritesCtrl', ['$scope', function ($scope) {
    if (!localStorage.photos) {
      $scope.favorites = [];
    } else {
      $scope.favorites = JSON.parse(localStorage.photos);
    }
  }]);
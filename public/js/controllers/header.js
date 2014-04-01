angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    }, {
        "title": "Photos",
        "link":  "photos"
    }, {
        "title": "Videos",
        "link":  "videos"
    }, {
        "title": "Us",
        "link":  "us"
    }];
    
    $scope.isCollapsed = false;
}]);
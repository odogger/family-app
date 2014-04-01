angular.module('mean.system').controller('IndexController', ['$scope', '$location', 'Global', function ($scope, $location, Global) {
    $scope.global = Global;
    if($location.path() === '/'){
        $location.path("photos/page1");
    }
} ]);
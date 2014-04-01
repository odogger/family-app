function preloadImage(src) {
    var image = new Image();
    image.src = src;
}
angular.module('mean.photos')
    .controller('PhotosController', ['$timeout', '$scope', '$routeParams', '$location', 'Global', 'Photos', function ($timeout, $scope, $routeParams, $location, Global, Photos) {
        $scope.global = Global;
        $scope.page = 1;
        $scope.noMore = false;
        $scope.busy = false;
        $scope.spinner = true;
        $scope.photos = [];
        $scope.create = function () {
            var photo = new Photos({
                title: this.title,
                desc: this.desc,
                url: this.url
            });
            photo.$save(function (response) {
                $location.path("photos/" + response._id);
            });

            this.title = "";
            this.content = "";

        };

        $scope.remove = function (photo) {
            photo.$remove();

            for (var i in $scope.photos) {
                if ($scope.photos[i] == photo) {
                    $scope.photos.splice(i, 1);
                }
            }
        };

        $scope.$on('handleUrlChange', function (event, args) {
            $scope.url = args.message;
        });

        $scope.update = function () {
            var photo = $scope.photo;
            if (!photo.updated) {
                photo.updated = [];
            }
            photo.updated.push(new Date().getTime());

            photo.$update(function () {
                $location.path('photos/' + photo._id);
            });
        };

        $scope.find = function () {
            $scope.noMore = false;
            $scope.busy = true;
            $scope.spinner = true;
            Photos.query({
                page: $routeParams.page,
                pageSize: 6
            },
        function (photos) {

            for (var i = 0; i < photos.length; i++) {
                var dt = moment(photos[i].created)
                photos[i].month = dt.format("MMM");
                photos[i].day = dt.format("Do");
            }

            $scope.photos = photos;
            $scope.spinner = false;
            $scope.busy = false;
        });
        };

        $scope.loadMore = function () {
            if ($scope.noMore === false) {
                $scope.busy = true;
                $scope.spinner = true;
                Photos.query({
                    page: $scope.page,
                    pageSize: 6
                },
        function (photos) {
            $scope.page = $scope.page + 1
            if (photos.length === 0) {
                $scope.noMore = true;
                $scope.busy = false;
                $scope.spinner = false;
                
                return;
            }

            for (var i = 0; i < photos.length; i++) {
                preloadImage(photos[i].url);
            }

            $timeout(function () {
                for (var i = 0; i < photos.length; i++) {
                    var dt = moment(photos[i].created)
                    photos[i].month = dt.format("MMM");
                    photos[i].day = dt.format("Do")
                    $scope.photos.push(photos[i])
                }
                $scope.busy = false;
                $scope.spinner = false;
            }, 2000);
        });
            }
        };

        $scope.findOne = function () {
            Photos.get({
                photoId: $routeParams.photoId
            }, function (photo) {
                $scope.photo = photo;
            });
        };
    } ]);
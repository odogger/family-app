function preloadImage(src) {
    var image = new Image();
    image.src = src;
}
angular.module('mean.videos')
    .controller('VideosController', ['$timeout', '$scope', '$routeParams', '$location', 'Global', 'Videos', function ($timeout, $scope, $routeParams, $location, Global, Videos) {
        $scope.global = Global;
        $scope.page = 1;
        $scope.noMore = false;
        $scope.busy = false;
        $scope.spinner = true;
        $scope.videos = [];
        $scope.create = function () {
            var video = new Videos({
                title: this.title,
                desc: this.desc,
                url: this.url
            });
            video.$save(function (response) {
                $location.path("videos/page1");
            });

            this.title = "";
            this.content = "";

        };

        $scope.remove = function (video) {
            video.$remove();

            for (var i in $scope.videos) {
                if ($scope.videos[i] == video) {
                    $scope.videos.splice(i, 1);
                }
            }
        };

        $scope.$on('handleUrlChange', function (event, args) {
            $scope.url = args.message;
        });

        $scope.update = function () {
            var video = $scope.video;
            if (!video.updated) {
                video.updated = [];
            }
            video.updated.push(new Date().getTime());

            video.$update(function () {
                $location.path('videos/' + video._id);
            });
        };

        $scope.find = function () {
            $scope.noMore = false;
            $scope.busy = true;
            $scope.spinner = true;
            Videos.query({
                page: $routeParams.page,
                pageSize: 3
            },
        function (videos) {

            for (var i = 0; i < videos.length; i++) {
                var dt = moment(videos[i].created)
                videos[i].month = dt.format("MMM");
                videos[i].day = dt.format("Do");
            }

            $scope.videos = videos;
            $scope.spinner = false;
            $scope.busy = false;
        });
        };

        $scope.loadMore = function () {
            if ($scope.noMore === false) {
                $scope.busy = true;
                $scope.spinner = true;
                Videos.query({
                    page: $scope.page,
                    pageSize: 3
                },
        function (videos) {
            $scope.page = $scope.page + 1
            if (videos.length === 0) {
                $scope.noMore = true;
                $scope.busy = false;
                $scope.spinner = false;
                
                return;
            }

            for (var i = 0; i < videos.length; i++) {
                preloadImage(videos[i].url);
            }

            $timeout(function () {
                for (var i = 0; i < videos.length; i++) {
                    var dt = moment(videos[i].created)
                    videos[i].month = dt.format("MMM");
                    videos[i].day = dt.format("Do")
                    $scope.videos.push(videos[i])
                }
                $scope.busy = false;
                $scope.spinner = false;
            }, 2000);
        });
            }
        };

        $scope.findOne = function () {
            Videos.get({
                videoId: $routeParams.videoId
            }, function (video) {
                $scope.video = video;
            });
        };
    } ]);
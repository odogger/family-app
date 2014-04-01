window.app = angular.module('mean', ['infinite-scroll','ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles', 'mean.photos', 'mean.videos', 'angularFileUpload', 'mean.fileupload', 'myModule']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.photos', []);
angular.module('mean.fileupload', []);
angular.module('mean.videos', []);
var myModule = angular.module('myModule', []);

myModule.run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleUrlChange', args);
    });
});

$("document").ready(function () {
    $(".menu-toggle").live("click touchstart", function (e) {
        e.stopPropagation(); e.preventDefault();
        $(".nav-left").toggleClass("nav-left-open");
    });
});
//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/photos/page:page', {
            templateUrl: 'views/photos/list.html'
        }).
        when('/photos/create', {
            templateUrl: 'views/photos/create.html'
        }).
        when('/photos/:photoId/edit', {
            templateUrl: 'views/photos/edit.html'
        }).
        when('/photos/:photoId', {
            templateUrl: 'views/photos/view.html'
        }).
        when('/videos/page:page', {
            templateUrl: 'views/videos/list.html'
        }).
        when('/videos/create', {
            templateUrl: 'views/videos/create.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        when('/us', {
                templateUrl: 'views/us.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
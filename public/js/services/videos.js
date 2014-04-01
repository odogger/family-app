//Articles service used for articles REST endpoint
angular.module('mean.videos').factory("Videos", ['$resource', function($resource) {
    return $resource('videos/:videoId', {
        videoId: '@_id',
        page: '@page',
        pageSize: '@pageSize'
    }, 
    {
       update: {
            method: 'PUT'
        }
    },
    {
        query: {
            method: 'GET',
            params: {
                  page : '1',
                  pageSize: '1'
            }
        }
    }
    
    );
}]);
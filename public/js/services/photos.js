//Articles service used for articles REST endpoint
angular.module('mean.photos').factory("Photos", ['$resource', function($resource) {
    return $resource('photos/:photoId', {
        photoId: '@_id',
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
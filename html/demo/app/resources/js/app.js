angular.module('farming_app', [])
        .controller('dataController', function ($scope, $http) {
        	var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

			$http.jsonp(url)
			    .success(function(data){
			        console.log(data.posts[0]);
			        $scope.dataresult = data.posts[0].content
			    });
        });
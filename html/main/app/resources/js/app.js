angular.module('agFuture', [])
        .controller('dataController', function ($scope, $http) {
        	var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

        	$scope.images =
			        [{
			        	  "photo": "http://nxworld.net/codepen/css-image-hover-effects/pic01.jpg",
						  "name": "Green House 1",
						  "location": "Boston",
						  "products": ["Apples", "Pears", "oranges"]
						}]

/*
			$http.jsonp(url)
			    .success(function(data){
			        console.log(data.posts[0]);
			        $scope.dataresult = data.posts[0].content
			    });

			    */
        });
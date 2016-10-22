angular.module('agFuture', [])
        .controller('dataController', function ($scope, $http) {
        	var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

        	$scope.images =
			        [{
						  "name": "Green House 1",
						  "location": "Boston",
						  "products": ["Apples", "Pears", "oranges"]
					},

					{
						"name": "Green House 2",
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
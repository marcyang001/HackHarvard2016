angular.module('agFuture', [])
    .controller('dataController', function ($scope, $http) {
        var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

        $scope.images = [
            {
                "name": "Apple Farm",
                "location": "Boston",
                "products": ["Lots of Apples", "Some Pears", "Some Oranges"],
                "photo": "img/apples.jpeg"
            }, {
                "name": "Greenhouse of Leafy Greens",
                "location": "Montreal",
                "products": ["Kale", "Collard Greens", "Spinach", "Rapini"],
                "photo": "img/leafygreen.jpg"
            }, {
                "name": "Orange Farm",
                "location": "Orlando",
                "products": ["Only Oranges"],
                "photo": "img/oranges.jpeg"
            }
        ]

        /*
         $http.jsonp(url)
         .success(function(data){
         console.log(data.posts[0]);
         $scope.dataresult = data.posts[0].content
         });

         */
    });
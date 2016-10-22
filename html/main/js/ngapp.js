/**
 * Created by Ericp on 2016-10-22.
 */


var farmApp = angular.module("farmApp", []);
farmApp.controller('ctrl', function ($scope, $http) {
    $scope.isAnalyses = true;
    $scope.isCtrl = false;
    $scope.isLog = false;
    $scope.showAnalyses = function () {
        $scope.isAnalyses = true;
        $scope.isCtrl = false;
        $scope.isLog = false;
    }
    $scope.showCtrl = function () {
        $scope.isAnalyses = false;
        $scope.isCtrl = false;
        $scope.isLog = true;
    }
    $scope.showLog = function () {
        $scope.isAnalyses = false;
        $scope.isCtrl = false;
        $scope.isLog = true;
    }
    //var url = "http://127.0.0.1:3000/index?callback=JSON_CALLBACK"
    var url_wind ="data/windpress.json?callback=JSON_CALLBACK";
    //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
    $http({
        method : "GET",
        url : url_wind
    }).then(function mySucces(response) {
        resultList = response.data
        resultList.map(function(obj){ 
            var rObj = [];
            windData.push([obj.date, obj.windspeed])
        })
    }, function myError(response) {
        console.log("error retrieving file: " + response)
    });

    //console.log("pass here");
    
    var url_temp ="data/temp.json?callback=JSON_CALLBACK";
    //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
    $http({
        method : "GET",
        url : url_temp
    }).then(function mySucces(response) {
        
        console.log(response)
    }, function myError(response) {
        console.log(response)
    });





    /*
    tempData.push(
        ['10/24', 8, 8, 12, 12, '8 - 12 Sunny'],
        ['10/25', 5, 5, 11, 11, '5 - 11 Cloudy'],
        ['10/26', 7, 7, 12, 12, '7 - 12 Sunny'],
        ['10/27', 7, 7, 9, 9, '7 - 9 Little Shower'],
        ['10/28', 10, 10, 15, 15, '10 - 15'],
        ['10/29', 14, 14, 18, 18, '8 - 12'],
        ['10/30', 9, 9, 17, 17, '8 - 12'],
        ['10/31', 6, 6, 12, 12, '8 - 12'],
        ['11/1', 4, 4, 11, 11, '8 - 12']
    );
    */

    dailyRainData.push(['10/29', 200]);
    dailyRainData.push(['10/30', 400]);

    monthlyRainData.push(['1', 40]);
    monthlyRainData.push(['2', 24]);

    //windData.push(['11/01', 3]);

    



    
});
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
        $scope.isCtrl = true;
        $scope.isLog = false;
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
        
        resultTempDailytList = response.data.daily;
        resultTempMonthlyList = response.data.monthly;

        resultTempDailytList.map(function(obj) {

            var forcaststring = obj.date+":\n"+obj.low + " - "+obj.high+ " " + obj.forecast;

            tempData.push([obj.date, obj.low, obj.low, obj.high, obj.high, forcaststring])

            dailyRainData.push([obj.date, parseFloat(obj.precip)])

        });

        
        resultTempMonthlyList.map(function(obj) {

            monthlyRainData.push([obj.month.toString(), obj["total-precip"]])
        })
        


        console.log(response)
    }, function myError(response) {
        console.log(response)
    });
    
    
});
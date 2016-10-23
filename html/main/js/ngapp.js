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
    var url_wind = "data/windpress.json?callback=JSON_CALLBACK";
    //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
    var windResultList;
    var avgWind = 0;
    $http({
        method: "GET",
        url: url_wind
    }).then(function mySucces(response) {
        windResultList = response.data
        windResultList.map(function (obj) {
            windData.push([obj.date, obj.windspeed])
            avgWind += obj.windspeed;
        })
        avgWind = parseFloat(avgWind) / 10;
        $scope.avgWindSpd = avgWind;
    }, function myError(response) {
        console.log("error retrieving file: " + response)
    });
    var url_temp = "data/temp.json?callback=JSON_CALLBACK";
    //var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
    $http({
        method: "GET",
        url: url_temp
    }).then(function mySucces(response) {

        var resultTempDailytList = response.data.daily;
        var resultTempMonthlyList = response.data.monthly;

        resultTempDailytList.map(function (obj) {

            var forcaststring = obj.date + ":\n" + obj.low + " - " + obj.high + " " + obj.forecast;

            tempData.push([obj.date, obj.low, obj.low, obj.high, obj.high, forcaststring])

            dailyRainData.push([obj.date, parseFloat(obj.precip)])

        });

        resultTempMonthlyList.map(function (obj) {
            monthlyRainData.push([obj.month.toString(), obj["total-precip"]])
        });

        resultTempDailytList.map(function (obj) {
            avgTempData.push([obj.date, obj.avghigh, obj.high, obj.avglow, obj.low]);
        });

        // finding max/min
        var maxTemp = -9999;
        var dateOfMaxTemp;
        var minTemp = 9999;
        var dateOfMinTemp;
        resultTempDailytList.map(function (obj) {
            if (obj.high > maxTemp) {
                dateOfMaxTemp = obj.date;
                maxTemp = obj.high;
            }
            if (obj.low < minTemp) {
                dateOfMinTemp = obj.date;
                minTemp = obj.low;
            }
        });
        $scope.highestTemp = maxTemp;
        $scope.lowestTemp = minTemp;
        $scope.maxTempDate = dateOfMaxTemp;

        var maxRain = -9999;
        var dateOfMaxRain = '1';
        var minRain = 9999;
        var dateOfMinRain = '';
        var noRainRatio = 0;
        resultTempDailytList.map(function (obj) {
            if (obj.precip > maxRain) {
                dateOfMaxRain = obj.date;
                maxRain = obj.precip;
            }
            if (obj.precip < minRain) {
                dateOfMinRain = obj.date;
                minRain = obj.precip;
            }
            if (obj.precip <= 0.01) {
                noRainRatio += 1;
            }
        });
        noRainRatio = parseFloat(noRainRatio) / 90;

        $scope.maxRainDate = dateOfMaxRain;
        $scope.percentageOfNoRain = noRainRatio;


        // console.log(response)
    }, function myError(response) {
        console.log(response)
    });


});
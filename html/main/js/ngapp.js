/**
 * Created by Ericp on 2016-10-22.
 */


var farmApp = angular.module("farmApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
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
        
    }, function myError(response) {
        console.log(response)
    });
});

farmApp.controller('ctrl2', function ($scope) {
    /* temperature control */
    var tempvalue = 28;
    $scope.tempminus = function() {
    
        if (tempvalue == 0) {
            tempvalue = 0;
        }
        else {
            tempvalue = tempvalue - 1;
        }

        $scope.temperature = tempvalue;
    };
    $scope.tempminus();

    $scope.tempadd = function() {

        if (tempvalue == 100) {
            tempvalue = 100;
        }
        else {
            tempvalue = tempvalue + 1;
        }

        $scope.temperature = tempvalue;
    };
    $scope.tempadd();

    /* humidity control */
    var humidity_value = 58;
    $scope.hum_minus = function () {

        if (humidity_value == 0) {
            humidity_value = 0;
        }
        else {
            humidity_value = humidity_value-1;
        }
        $scope.humidity = humidity_value;
    };
    $scope.hum_minus()


    $scope.hum_plus = function () {

        if (humidity_value == 100) {
            humidity_value = 100;
        }
        else {
            humidity_value = humidity_value+1;
        }
        $scope.humidity = humidity_value;
    };
    $scope.hum_plus()

    /* oxygen concentration*/
    var oxygen_value = 20;

    $scope.oxconcent_minus = function () {

        if (humidity_value == 0) {
            oxygen_value = 0;
        }
        else {
            oxygen_value = oxygen_value-1;
        }
        $scope.oxconcent = oxygen_value;
    };
    $scope.oxconcent_minus()
    

    $scope.oxconcent_plus = function () {

        if (humidity_value == 0) {
            oxygen_value = 0;
        }
        else {
            oxygen_value = oxygen_value+1;
        }
        $scope.oxconcent = oxygen_value;
    };
    $scope.oxconcent_plus()

    /* illumination */
    var illu_value = 35.7

    $scope.illu_minus = function() {

        if (illu_value == 0) {
            illu_value = 0;
        }
        else {
            illu_value = illu_value - 1;
        }
        $scope.illumination = illu_value;

    }
    $scope.illu_minus()

    $scope.illu_plus = function() {

        if (illu_value == 100) {
            illu_value = 100;
        }
        else {
            illu_value = illu_value + 1;
        }
        $scope.illumination = illu_value;

    }
    
    $scope.illu_plus()

});

/**
 * Created by Ericp on 2016-10-22.
 */


var farmApp = angular.module("farmApp", []);
farmApp.controller('ctrl', function ($scope) {
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
    
});
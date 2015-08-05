'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
var app = angular.module('publicApp');

app.controller('MainCtrl', function ($scope) {
    $scope.config = {
    	displayProperty: 'name',
      url:"/values/<parameter>"
    }


  });


app.directive('autocomplete', function () {
  return {
    restrict: 'A',
    require: ['ngModel'],
    scope: {
      ngModel: '=',
      config:"="
    },
    templateUrl:'views/autocomplete.html',
    replace: true,
    controller: function ($scope, $http, $timeout, $element, $document) {

      //--Private Variables--
      var timer = 0;
      var keys = {
        enter: 13,
        backspace: 8,
        down: 40,
        up: 38
      }

      //--Public Variables--
      $scope.temp = null;         //Value shown in the input created by the directive
      $scope.preSelected = null;  //Value pre-selected, in case someone hits enter this value gets selected
      $scope.values = [];         //Array with all the posible values
      

      //--Private Functions--
      
      //Indicate if there is a value selected
      function isSelected() {
        return $scope.ngModel != null && $scope.ngModel != "";
      }
      //Add the class active to the directive in order to open the list
      var openCombobox = function(){
        $element.addClass('dropdown-active');
      }

      var closeCombobox = function(){
        $element.removeClass('dropdown-active');
      }
      //??
      var delay = function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
      //
      var getData = function (value) {
        if (value){
          $http.get($scope.config.url.replace("<parameter>",value))
            .success(function (data){
              $scope.values =data;
              $scope.preSelected = 0;
              openCombobox();            
            })
            .error(function (data){
              console.log('Error',data);
            });
        }else{
          $scope.values = [];
          $scope.preSelected = null;
          $scope.$apply();
        }
      }
      //Move the index of the item preselected
      var movePreselected = function(steps){
        var tmp = $scope.preSelected + steps;
        if (tmp >= 0 && tmp < $scope.values.length)
          $scope.preSelected = tmp;
      };

      //--Public Functions--

      //Function which update both the directive's input and the real model.
      $scope.setModel = function (value){
        $scope.preSelected = null;
        $scope.ngModel = angular.copy(value);
        $scope.temp = value[$scope.config.displayProperty];
        closeCombobox();
      }
      //Only allows writting if there is not value selected or you are trying to delete
      $scope.writting = function (event){
        if (isSelected()) {
          //Only allow delete
          event.preventDefault();

          if(event.keyCode == keys.backspace) {
            $scope.temp = null;
            $scope.ngModel = null;
            $scope.preSelected = null;
          };    
        } 

      }
      //After writting, looks for all the posible values and show them in the list
      $scope.written = function (value){
        //Just execute if there isn't anything selected
        if (!isSelected())
        {
          switch(event.keyCode) {
            case keys.enter:
             $scope.setModel($scope.values[$scope.preSelected]);
             break;
            case keys.up:
             movePreselected(-1);
             break;
            case keys.down:
             movePreselected(+1);
             break;
            default:
              delay(function(){
                getData(value);
              },300);
          }
        }
      }

      // -- Implementation --
      $document.bind('click', function() {
        $element.removeClass('dropdown-active');
      });
      
      

    }
  };
});
(function () {
    'use strict';

    angular
        .module('portal')
        .controller('ResetController', ResetController);

    ResetController.$inject = ['$location', '$scope', '$http'];
    function ResetController($location, $scope, $http) {

            $scope.rstSubmit = function() {

                //var username = $scope.userN;




            };

        $scope.rstCancel = function() {

            //var username = $scope.userN;

            $location.url("/login");


        };






    }

})();

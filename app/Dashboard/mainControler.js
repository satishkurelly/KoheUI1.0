(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function MainController(UserService, $location, $rootScope, FlashService) {
       

       


    }

})();

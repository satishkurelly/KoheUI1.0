(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function UserProfileController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.reset = reset;

        function reset() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('UserProfile successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
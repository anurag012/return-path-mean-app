(function() {
    'use strict';

    angular.module('plunker')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['userService'];

    function UsersController(userService) {
        var mainVm = this;

        mainVm.addUser = addUser;
        mainVm.deleteUser = deleteUser;
        mainVm.updateUser = updateUser;
        mainVm.edit = edit;
        mainVm.changeSort = changeSort;
        mainVm.submit = submit;
        
        init();

        function init() {

            mainVm.sorter = {
                by: 'firstName',
                reverse: false
            };

            userService.getUsers()
                .then(function(users) {
                    mainVm.users = users;
                }, function(error) {
                    console.error(error);
                });
        }

        function changeSort (prop) {
            mainVm.sorter.by = prop;
            mainVm.sorter.reverse = !mainVm.sorter.reverse;
        }

        function addUser() {
            console.log(mainVm.newUser);
            userService.createUser(mainVm.newUser).then(function(users) {
                mainVm.users.push(users);
                mainVm.newUser="";
            }, function(error) {
                console.error(error);
            });
        }
        
        function deleteUser(id) {
            console.log("Got delete request for:",id);
            userService.deleteUser(id).then(function (id) {
                init();
            }, function (error) {
                console.log(error);
            });
        }
        
        function updateUser() {
           console.log("Got HERE:",mainVm.newUser, mainVm.newUser._id);
            userService.updateUser(mainVm.newUser, mainVm.newUser._id).then(function() {
                init();
                mainVm.newUser="";
            }, function(error) {
                console.error(error);
            });
        }
        
        function submit() {
            if(mainVm.newUser._id == null){
                mainVm.addUser();
            } else{
                mainVm.updateUser();
            }
            
        }
        
        function edit(id) {
            console.log("Got edit request for id: "+id);
            for(var i=0; i<mainVm.users.length;i++){
                if(mainVm.users[i]._id === id){
                    console.log("reached edit request for id: "+id);
                    mainVm.newUser = angular.copy(mainVm.users[i]);
                    console.log("set edit request for id: "+id);
                    break;
                }

            }
        }


    }

})();
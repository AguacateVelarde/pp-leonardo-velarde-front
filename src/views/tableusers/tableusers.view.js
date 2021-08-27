import angular from "angular";
import template from "./tableusers.tpl.html";
import headerItem from "../../components/header-item/header-item.component";
import usersService from "../../services/users.service";

export default angular
  .module("tableusers.view", [headerItem])
  .factory(usersService.name, usersService.factory)
  .component("tableusers", {
    template,
    controller: [
      usersService.name,
      "$scope",
      "$location",
      function ($userService, $scope, $location) {
        $scope.users = [];
        $scope.vipUsers = [];
        $scope.isLoadingVIPUsers = false;
        $scope.isOpenVIPUsers = false;
        $scope.menuItems = ["Nombre", "Email", "Genero", "Pasatiempo", ""];

        $scope.createNewUser = function () {
          $location.path("/register");
        };
        $scope.loadVIPUsers = function () {
          if ($scope.isOpenVIPUsers == false) {
            $scope.isLoadingVIPUsers = true;
            $userService.getVIPUsers().then((_users) => {
              $scope.vipUsers = _users.data.hoobies;
              $scope.isLoadingVIPUsers = false;
              $scope.isOpenVIPUsers = true;
            });
          } else {
            $scope.isOpenVIPUsers = false;
          }
        };

        $userService
          .getUsers()
          .then((_users) => {
            $scope.users = _users.data.users;
          })
          .catch(() => {
            $location.path("/login");
          });

        $scope.search = function (keyEvent) {
          if (keyEvent.which === 13) {
            const word = keyEvent.target.value;
            $userService.searchUser(word).then((_users) => {
              $scope.users = _users.data.users;
            });
          }
        };

        $scope.deleteUser = function (userId) {
          $userService.deleteUser(userId).then(() => {
            $scope.users = $scope.users.filter((x) => x._id !== userId);
          });
        };
      },
    ],
  }).name;

import angular from "angular";
import template from "./register.tpl.html";
import usersService from "../../services/users.service";
import authService from "../../services/auth.service";

export default angular
  .module("register.view", [])
  .factory(usersService.name, usersService.factory)
  .factory(authService.name, authService.factory)
  .component("register", {
    template,
    controller: [
      usersService.name,
      authService.name,
      "$scope",
      "$location",
      function ($userService, $authService, $scope, $location) {
        $scope.errorMessage = null;
        $scope.genre = "none";
        $scope.validate = function (
          name,
          hobby,
          genre,
          phoneNumber,
          age,
          email,
          password
        ) {
          $userService
            .createUser({
              name,
              hobby,
              genre,
              phoneNumber,
              age,
              email,
              password,
            })
            .then(() => {
              $authService
                .createToken(email, password)
                .then((response) => {
                  $scope.errorMessage = null;
                  $authService.saveToken(response.data.token);
                  $location.path("/");
                })
                .catch(() => {
                  $scope.errorMessage = `Ups, hubo un error con tu contraseña`;
                });
            });
        };
      },
    ],
  }).name;

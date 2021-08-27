import angular from "angular";
import template from "./login.tpl.html";
import authService from "../../services/auth.service";

export default angular
  .module("login.view", [])
  .factory(authService.name, authService.factory)
  .component("login", {
    template,
    controller: [
      "$scope",
      "$location",
      authService.name,
      function ($scope, $location, $authService) {
        $scope.errorMessage = null;
        $scope.login = function (email, password) {
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
        };
      },
    ],
  }).name;

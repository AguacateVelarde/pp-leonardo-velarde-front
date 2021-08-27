import config from "../common/config";

export default {
  name: "authService",
  factory: [
    "$http",
    "localStorageService",
    ($http, localStorageService) => {
      function isAuthenticated() {
        const token = localStorageService.get("auth-token");

        if (token === null) {
          return false;
        }

        return true;
      }

      function saveToken(token) {
        localStorageService.set("auth-token", token);
      }

      function createToken(email, password) {
        return $http.post(config.api.base + config.api.resources.token, {
          email,
          password,
        });
      }
      return {
        isAuthenticated,
        createToken,
        saveToken,
      };
    },
  ],
};

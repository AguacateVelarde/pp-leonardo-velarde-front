import config from "../common/config";

export default {
  name: "usersService",
  factory: [
    "$http",
    "localStorageService",
    ($http, $localStorageService) => {
      function getUsers() {
        const token = $localStorageService.get("auth-token");
        return $http.get(config.api.base + config.api.resources.user, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }

      function createUser(userPayload) {
        return $http.post(
          config.api.base + config.api.resources.user,
          userPayload
        );
      }

      function deleteUser(userId) {
        const { base, resources } = config.api;
        const resource = `${base}${resources.user}${userId}`;
        return $http.delete(resource);
      }

      function getVIPUsers() {
        const token = $localStorageService.get("auth-token");
        return $http.get(
          config.api.base + config.api.resources.user + "vip-users",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }

      function searchUser(searchWord) {
        const token = $localStorageService.get("auth-token");
        return $http.get(
          config.api.base + config.api.resources.user + "search",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              q: searchWord,
            },
          }
        );
      }

      return {
        getUsers,
        deleteUser,
        createUser,
        searchUser,
        getVIPUsers,
      };
    },
  ],
};

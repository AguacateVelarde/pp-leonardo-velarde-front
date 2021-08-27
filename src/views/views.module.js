import angular from "angular";
import config from "../common/config";

import usersView from "./users/users.view";
import homeView from "./home/home.view";
import loginView from "./login/login.view";
import registerView from "./register/register.view";
import tableusersView from "./tableusers/tableusers.view";

export default angular.module(`${config.appName}.views`, [
  usersView,
  homeView,
  loginView,
  registerView,
  tableusersView,
]).name;

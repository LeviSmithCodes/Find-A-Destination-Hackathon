import PostsController from "./Controllers/PostsController.js";
import UsersController from "./Controllers/UsersController.js";

class App {
  //debugger;
  postsController = new PostsController();
  usersController = new UsersController();
}

window["app"] = new App();

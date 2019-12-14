import PostsController from "./Controllers/PostsController.js";

class App {
  //debugger;
  postsController = new PostsController();
}

window["app"] = new App();

import PostsController from "./Controllers/PostsController.js";
import CommentsController from "./Controllers/CommentsController.js";

class App {
  //debugger;
  postsController = new PostsController();
  commentsController = new CommentsController();
}

window["app"] = new App();

import PostsService from "../Services/PostsService.js";
import store from "../store.js";
import postsService from "../Services/PostsService.js";

//Private
function _drawPosts() {
  let posts = store.State.posts;
  let postTemplate = "";
  posts.forEach(post => (postTemplate += post.previewPostTemplate));
  document.getElementById("posts").innerHTML = postTemplate;
}

//Public

export default class PostsController {
  constructor() {
    //debugger;
    store.subscribe("posts", _drawPosts);
  }

  toggleFormOn() {
    document.querySelector("#createPost").classList.remove("d-none");
  }

  toggleFormOff() {
    document.querySelector("#createPost").classList.add("d-none");
  }
  toggleEditFormOn() {
    document.querySelector("#editPost").classList.remove("d-none");
  }

  toggleEditFormOff() {
    document.querySelector("#editPost").classList.add("d-none");
  }

  async getPosts() {
    try {
      await PostsService.getPosts();
    } catch (error) {
      console.error(error);
    }
  }
  async createPost(event) {
    try {
      event.preventDefault();
      let formData = event.target;
      let newPost = {
        title: formData.title.value,
        imgUrl: formData.image.value,
        description: formData.description.value,
        rating: formData.rating.value
      };
      PostsService.createPost(newPost);
      formData.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async editPost(postId, event) {
    try {
      let formData = event.target;
      let updatedPost = {
        description: formData.description.value,
        rating: formData.rating.value
      };
      await PostsService.editPost(postId, updatedPost);
    } catch (error) {
      console.error(error);
    }
  }
  async deletePost(postId) {
    try {
      await PostsService.deletePost(postId);
    } catch (error) {
      console.error(error);
    }
  }

  async getPostById(postId) {
    try {
      await PostsService.getPostById(postId);
    } catch (error) {
      console.error(error);
    }
  }

  makeActivePost(postId) {
    try {
      PostsService.makeActivePost(postId);
    } catch (error) {
      console.error(error);
    }
  }
}

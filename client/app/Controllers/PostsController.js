import postsService from "../Services/PostsService.js";
import store from "../store.js";

//Private
function _drawPosts() {
  let posts = store.State.posts;
  let postTemplate = "";
  posts.forEach(post => (postTemplate += post.previewPostTemplate));
  document.getElementById("posts").innerHTML = postTemplate;
}
function _drawActivePost() {
  let Activepost = store.State.activePost;
  document.getElementById("posts").innerHTML = Activepost.singlePostTemplate;
}
//Public

export default class PostsController {
  constructor() {
    //debugger;
    store.subscribe("posts", _drawPosts);
    store.subscribe("activePost", _drawActivePost);
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
      await postsService.getPosts();
    } catch (error) {
      console.error(error);
    }
  }
  async createPost(event) {
    if (store.State.activeUser.id) {
      try {
        event.preventDefault();
        let formData = event.target;
        let newPost = {
          title: formData.title.value,
          imgUrl: formData.image.value || " ",
          description: formData.description.value || " ",
          rating: formData.rating.value || 0,
          upvote: 0,
          downvote: 0
        };
        postsService.createPost(newPost);
        formData.reset();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async editPost(postId, userId, event) {
    try {
      let formData = event.target;
      let updatedPost = {
        description: formData.description.value,
        rating: formData.rating.value
      };
      await postsService.editPost(postId, userId, updatedPost);
    } catch (error) {
      console.error(error);
    }
  }
  async deletePost(postId, userId) {
    swal({
      title: "Oh really?",
      text: "Once deleted, there is no going back..",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Bye-bye! Your post has been eviscerated!", {
          icon: "success"
        });
        debugger;
        postsService.deletePost(postId, userId);
      } else {
        swal("Yeah, that's what I thought.");
      }
    });
  }

  async getActivePostById(postId) {
    try {
      await postsService.getActivePostById(postId);
    } catch (error) {
      console.error(error);
    }
  }
}

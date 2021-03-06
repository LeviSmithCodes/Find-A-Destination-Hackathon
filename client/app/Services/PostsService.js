import store from "../store.js";
import Post from "../Models/Post.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//localhost:3000/api"
});

class PostsService {
  async createPost(newPost) {
    _sandBox
      .post("/posts", newPost)
      .then(res => {
        this.getPosts();
      })
      .catch(err => {
        console.error(err);
      });
  }
  //constructor() {}

  async getPosts() {
    let res = await _sandBox.get("/posts");
    store.commit(
      "posts",
      res.data.map(p => new Post(p))
    );
  }
  async editPost(postId, userId, updatedPost) {
    let postToUpdate = store.State.posts.find(p => p.postId == postId);
    if (postToUpdate.userId == userId) {
      postToUpdate.description = updatedPost.description;
      postToUpdate.rating = updatedPost.rating;
      let res = await _sandBox
        .put(`/'${postId}'/'${userId}'`, postToUpdate)
        .then(res => {
          this.getPosts();
        });
    }
  }
  async deletePost(postId, userId) {
    let postToDelete = store.State.posts.find(post => post.postId == postId);
    if (postToDelete.userId == userId) {
      _sandBox.delete(`/'${postId}'/'${userId}'`, postToDelete).then(res => {
        this.getPosts();
      });
    }
  }

  async getActivePostById(postId) {
    let activePost = store.State.posts.find(p => p.postId == postId);
    store.commit("activePost", activePost);
  }
}

const postsService = new PostsService();
export default postsService;

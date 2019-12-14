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
      res.data.posts.map(p => new Post(p))
    );
  }
  async editPost(postId, updatedPost) {
    let postToUpdate = store.State.posts.find(p => p.id == postId);
    postToUpdate.description = updatedPost.description;
    postToUpdate.rating = updatedPost.rating;
    let res = await _sandBox.put(postId, postToUpdate).then(res => {
      this.getPosts();
    });
  }
  async deletePost(postId) {
    let postToDelete = store.State.posts.find(post => post.id == postId);
    _sandBox.delete(`/${postId}`, postToDelete).then(res => {
      this.getPosts();
    });
  }

  makeActivePost(postId) {
    let activePost = store.State.posts.find(p => p.id == postId);
    store.commit("activePost", activePost);
  }

  getPostById(postId) {}
}

const postsService = new PostsService();
export default postsService;

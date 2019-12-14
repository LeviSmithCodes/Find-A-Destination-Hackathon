import store from "../store.js";
import Comment from "../Models/Comment.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//localhost:3000/api"
});

class CommentsService {
  async createComment(newComment) {
    if (!store.State.activeUser.id) {
      throw new Error("Login to create a comment");
    }
    let res = await _sandBox.post(
      `/comments/${newComment.postId}/${store.State.activeUser.id}`,
      newComment
    );
    store.State.comments.push(new Comment(res.data));
    store.commit("comments", store.State.comments);
  }
  //constructor() {}

  async getCommentsById(postId) {
    let res = await _sandBox.get(`/posts/${postId}/comments`);
    console.log("pulling comments", res);

    store.commit(
      "comments",
      res.data.map(c => new Comment(c))
    );
  }
  async editComment(commentId, description) {
    let comment = store.State.comments.find(c => c.commentId == commentId);
    let uid = store.State.activeUser.id;
    if (comment.userId != uid) {
      throw new Error("nope invalid user id");
    }
    comment.description = description;
    let res = await _sandBox.put(`/comments/${commentId}/${uid}`, comment);
    this.getCommentsById(comment.postId);
  }

  async deleteComment(userId, commentId, postId) {
    let commentToDelete = store.State.comments.find(
      comment => comment.commentId == commentId
    );
    await _sandBox.delete(`comments/${commentId}/${userId}`);
    this.getCommentsById(postId);
  }
}

const commentsService = new CommentsService();
export default commentsService;

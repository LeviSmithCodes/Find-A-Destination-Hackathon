import store from "../store.js";
import Comment from "../Models/Comment.js";

// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//localhost:3000/api"
});

class CommentsService {
  async createComment(newComment, postId, userId) {
    _sandBox
      .post(`/comments/'${postId}'/'${userId}`, newComment)
      .then(res => {
        this.getCommentsById(postId);
      })
      .catch(err => {
        console.error(err);
      });
  }
  //constructor() {}

  async getCommentsById(postId) {
    store.State.comments.length = 0;
    let res = await _sandBox.get(`/'${postId}'/comments`);
    store.commit(
      "comments",
      res.data.map(c => new Comment(c))
    );
  }
  async editComment(commentId, updatedComment, userId, postId) {
    let commentToUpdate = store.State.comments.find(c => c.id == commentId);
    commentToUpdate.description = updatedComment.description;
    commentToUpdate.rating = updatedComment.rating;
    let res = await _sandBox
      .put(`/'${commentId}'/'${userId}'`, commentToUpdate)
      .then(res => {
        this.getCommentsById(postId);
      });
  }

  async deleteComment(commentId, userId, postId) {
    let commentToDelete = store.State.comments.find(
      comment => comment.commentId == commentId
    );
    _sandBox
      .delete(`/'${commentId}'/'${userId}'`, commentToDelete)
      .then(res => {
        this.getCommentsById(postId);
      });
  }
}

const commentsService = new CommentsService();
export default commentsService;

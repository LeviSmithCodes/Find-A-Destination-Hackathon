export default class Comment {
  constructor(data) {
    this.upvote = data.upvote || 0;
    this.description = data.description;
    this.downvote = data.downvote || 0;
    this.postId = data.postId;
    this.userId = data.userId;
    this.commentId = data.id;
  }

  get commentTemplate() {
    return `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${this.description}</h5>
        <button class="btn btn-success" type="button">
          <p>Upvotes: ${this.upvote}</p>
        </button>
        <button class="btn btn-danger" type="button">
          <p>Downvotes: ${this.downvote}</p>
        </button>
        <button class="btn btn-danger" onclick="app.commentsController.deleteComment('${this.userId}', '${this.commentId}', '${this.postId}')">Delete Comment</button>
        <button class="btn btn-success" onclick="app.commentsController.toggleEditFormOn()">
        Edit Comment
        </button>
    <div class="d-none" id="editCommentForm">
      <form
        class="form-group"
        onsubmit="app.commentsController.editComment(event, ${this.userId}, ${this.commentId}, ${this.postId}), app.commentsController.toggleEditFormOff()"
      >
        <label for="description">Edit Comment</label>
        <textarea
          name="description"
          class="form-control"
          cols="20"
          rows="2"
          maxlength="200"
        ></textarea>
        <button class="btn btn-success">Submit Comment</button>
      </form>
    </div>
      </div>
    </div>`;
  }
}

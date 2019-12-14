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
    return /* html */ `
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
        <button class="btn btn-success" onclick="app.commentsController.toggleEditFormOn('${this.commentId}')">
        Edit Comment
        </button>
        <div class="d-none" id="c-${this.commentId}">
          <form onsubmit="app.commentsController.editComment('${this.commentId}')">
           <div class="form-group">
            <label for="name">Edit Comment</label>
            <input  name="name" type="text" class="form-control" placeholder="Enter Comment..." required/>
            </div>
            <button type="submit" class="btn btn-success">Submit Comment</button>
          </form>
        </div>
      </div>
    </div>
    `;
  }
}

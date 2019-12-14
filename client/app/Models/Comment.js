export default class Comment {
  constructor(data) {
    this.upvote = data.upvote || 0;
    this.description = data.description;
    this.downvote = data.downvote || 0;
    this.id = data.postId;
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
      </div>
    </div>`;
  }

  get createCommentTemplate() {
    return `<form class="form-group">
        <label for="comment">Write a Comment</label>
        <textarea
          name="comment"
          class="form-control"
          cols="30"
          rows="3"
          maxlength="200"
        ></textarea>
        <button class="btn btn-success">Submit Comment</button>
      </form>`;
  }
}

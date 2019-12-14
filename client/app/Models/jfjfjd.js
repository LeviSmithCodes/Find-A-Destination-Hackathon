<div class="col-md-12 basic-post">
  <div class="card" style="width: 18rem;">
    <h3 class="card-title">${this.title}</h3>
    <img src="${this.url}" class="card-img-top" alt="should be custome img" />
    <div class="card-body">
      <p class="card-text">${this.description}</p>
      <p>${this.rating}</p>
      <button class="btn btn-success" type="button">
        <p>Upvotes: ${this.upvote}</p>
      </button>
      <button class="btn btn-danger" type="button">
        <p>Downvotes: ${this.downvote}</p>
      </button>
      <button
        class="btn"
        type="button"
        onclick="app.postsController.toggleEditFormOn()"
      >
        Edit
      </button>
      <button
        class="btn"
        type="button"
        onclick="app.postsController.deletePost(${this.postId}, ${this.userId})"
      >
        Delete Post
      </button>
    </div>
  </div>
  <div class="d-none" id="editPost">
    <form
      class="text-left p-3"
      onsubmit="app.postsController.editPost(${this.postId}, ${this.userId}, event), app.postsController.toggleEditFormOff()"
    >
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          name="description"
          class="form-control"
          placeholder="Enter Description..."
          required
        />
      </div>
      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          type="number"
          name="rating"
          class="form-control"
          placeholder="Enter Rating(Number)..."
        />
      </div>
      <button type="submit" class="btn btn-primary btn-block">
        Submit
      </button>
    </form>
  </div>
  <button
    class="btn btn-success"
    onclick="app.commentsController.toggleCommentFormOn()"
  >
    Write Comment
  </button>
  <div class="d-none" id="createCommentForm">
    <form
      class="form-group"
      onsubmit="app.commentsController.createComment(event, ${this.userId}, ${this.postId}), app.commentsController.toggleCommentFormOff()"
    >
      <label for="description">Write a Comment</label>
      <textarea
        name="description"
        class="form-control"
        cols="30"
        rows="3"
        maxlength="200"
      ></textarea>
      <button class="btn btn-success">Submit Comment</button>
    </form>
  </div>
  <div id="comments"></div>
</div>;

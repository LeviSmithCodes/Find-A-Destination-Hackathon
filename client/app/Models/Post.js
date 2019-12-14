import Comment from "./Comment.js";

export default class Post {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.url = data.imgUrl;
    this.rating = data.rating;
    this.upvote = data.upvote || 0;
    this.downvote = data.downvote || 0;
    this.id = data.id || data._id;
  }

  get singlePostTemplate() {
    return `<div class="col-md-12 basic-post">
      <div class="card" style="width: 18rem;">
        <img
          src="${this.url}"
          class="card-img-top"
          alt="should be custome img"
        />
        <div class="card-body">
          <h3 class="card-title">${this.title}</h3>
          <p class="card-text">${this.description}</p>
          <p>${this.rating}</p>
          <button class="btn btn-primary" type="button">Comment</button>
        </div>
        <button class="btn btn-success" type="button">
          <p>Upvotes: ${this.upvote}</p>
        </button>
        <button class="btn btn-danger" type="button">
          <p>Downvotes: ${this.downvote}</p>
        </button>
        <button class="btn" type="button" onclick="app.postsController.toggleEditFormOn()">Edit</button>
        <button class="btn" type="button" onclick="app.postsController.deletePost(${this.id})">Delete Post</button>
        <div class="d-none" id="editPost">
          <form
            class="text-left p-3"
            onsubmit="app.postsController.editPost(${this.id}, event), app.postsController.toggleEditFormOff()"
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
<div id ="createComment"></div>
        </div>
      <div id="comments"></div>
    </div>;`;
  }

  get previewPostTemplate() {
    return `
    <div class="col-md-4 basic-post">
          <div class="card" style="width: 18rem;">
            <img src="${this.url}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${this.title}</h5>
              <p class="card-text">${this.rating}</p>
              <button class="btn" type="button" onclick="app.postsController.getActivePostById(${this.id})">See Full Post</button>
            </div>
          </div>
        </div>
    `;
  }

  getCommentTemplate() {
    let template = "";
    this.comments.forEach(c => {});
  }
}

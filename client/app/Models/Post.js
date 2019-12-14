import Comment from "./Comment.js";

export default class Post {
  constructor(data) {
    this.title = data.title;
    this.description = data.description || " ";
    this.url = data.imgUrl || " ";
    this.rating = data.rating || 0;
    this.upvote = data.upvote || 0;
    this.downvote = data.downvote || 0;
    this.userId = data.userId;
    this.postId = data.id;
  }

  get singlePostTemplate() {
    let titleOnlyTemplate = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>`;
    let reviewNoImage = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <div class="card-body">
        <p class="card-text">${this.description}</p>
        <p>${this.rating}</p>`;
    let reviewJustTitleandRating = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <div class="card-body">
        <p>${this.rating}</p>`;
    let justNoRating = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <img
        src="${this.url}"
        class="card-img-top"
        alt="should be custome img"
      />
      <div class="card-body">
        <p class="card-text">${this.description}</p>`;
    let justTitleAndImage = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <img
        src="${this.url}"
        class="card-img-top"
        alt="should be custome img"
      />`;
    let fullTemplate = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <img src="${this.url}" class="card-img-top" alt="should be custome img" />
      <div class="card-body">
        <p class="card-text">${this.description}</p>
        <p>${this.rating}</p>`;
    let justTitleAndDescription = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <div class="card-body">
        <p class="card-text">${this.description}</p>`;
    let noDescription = `<div class="col-md-12 basic-post">
    <div class="card" style="width: 18rem;">
      <h3 class="card-title">${this.title}</h3>
      <img
        src="${this.url}"
        class="card-img-top"
        alt="should be custome img"
      />
      <div class="card-body">
        <p>${this.rating}</p>`;
    let template = `   <button class="btn btn-success" type="button">
          <p>Upvotes: ${this.upvote}</p>
        </button>
        <button class="btn btn-danger" type="button">
          <p>Downvotes: ${this.downvote}</p>
        </button>
        <button
          class="btn"
          type="button"
          onclick="app.postsController.toggleEditFormOn()"
        >Edit
        </button>
        <button
          class="btn"
          type="button"
          onclick="app.postsController.deletePost('${this.postId}', '${this.userId}')"
        >Delete Post
        </button>
      </div>
    </div>
    <div class="d-none" id="editPost">
      <form
        class="text-left p-3"
        onsubmit="app.postsController.editPost('${this.postId}', '${this.userId}', event), app.postsController.toggleEditFormOff()"
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
        <button type="submit" class="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
        <button class="btn btn-success" onclick="app.commentsController.toggleCommentFormOn()">
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
</div>`;
    if (
      this.title &&
      this.description == " " &&
      this.rating == 0 &&
      this.url == " "
    ) {
      titleOnlyTemplate += template;
      return titleOnlyTemplate;
    } else if (
      this.url == " " &&
      this.description &&
      this.rating &&
      this.title
    ) {
      reviewNoImage += template;
      return reviewNoImage;
    } else if (
      this.title &&
      this.rating &&
      this.url == " " &&
      this.description == " "
    ) {
      reviewJustTitleandRating += template;
      return reviewJustTitleandRating;
    } else if (this.rating == 0 && this.url && this.title && this.description) {
      justNoRating += template;
      return justNoRating;
    } else if (
      this.url &&
      this.title &&
      this.rating == 0 &&
      this.description == " "
    ) {
      justTitleAndImage += template;
      return justTitleAndImage;
    } else if (
      this.title &&
      this.description &&
      this.rating == 0 &&
      this.url == " "
    ) {
      justTitleAndDescription += template;
      return justTitleAndDescription;
    } else if (
      this.description == " " &&
      this.url &&
      this.rating &&
      this.title
    ) {
      noDescription += template;
      return noDescription;
    } else {
      fullTemplate += template;
      return fullTemplate;
    }
  }

  get previewPostTemplate() {
    let imageTemplate = /* html */ `<div class="col-md-4 basic-post">
    <div class="card" style="width: 18rem;">
      <img src="${this.url}" class="card-img-top" alt="..." />`;
    let questionTemplate = `<div class="col-md-4 basic-post">
    <div class="card" style="width: 18rem;">`;
    let template = `<div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">${this.rating}</p>
    <button class="button btn" type="button" onclick="app.postsController.getActivePostById('${this.postId}'), app.commentsController.getCommentsById('${this.postId}')">See Full Post</button>
    </div>
    </div>
    </div>`;

    if (this.url !== " ") {
      imageTemplate += template;
      return imageTemplate;
    } else if (this.url == " ") {
      questionTemplate += template;
      return questionTemplate;
    }
  }
}

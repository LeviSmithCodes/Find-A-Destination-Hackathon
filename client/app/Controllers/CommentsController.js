import store from "../store.js";
import commentsService from "../Services/CommentsServices.js";

//Private
function _drawComments() {
  let comments = store.State.comments;
  let commentsTemplate = "";
  comments.forEach(comment => (commentsTemplate += comment.commentTemplate));
  document.getElementById("comments").innerHTML = commentsTemplate;
}

//Public

export default class CommentsController {
  constructor() {
    store.subscribe("comments", _drawComments);
  }

  toggleCommentFormOn() {
    document.querySelector("#createCommentForm").classList.remove("d-none");
  }

  toggleCommentFormOff() {
    document.querySelector("#createCommentForm").classList.add("d-none");
  }
  toggleEditFormOn(elemId) {
    document.querySelector("#c-" + elemId).classList.remove("d-none");
  }

  toggleEditFormOff(elemId) {
    document.querySelector("#c-" + elemId).classList.add("d-none");
  }

  async getCommentsById(postId) {
    try {
      await commentsService.getCommentsById(postId);
    } catch (error) {
      console.error(error);
    }
  }
  async createComment(event, postId) {
    event.preventDefault();
    try {
      let formData = event.target;
      let newComment = {
        description: formData.description.value,
        upvote: 0,
        downvote: 0,
        postId
      };
      commentsService.createComment(newComment);
      formData.reset();
    } catch (error) {
      console.error(error);
    }
  }

  async editComment(commentId) {
    event.preventDefault();
    try {
      let form = event.target;
      await commentsService.editComment(commentId, form.name.value);
      this.toggleEditFormOff(commentId);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteComment(userId, commentId, postId) {
    swal({
      title: "Oh really?",
      text: "Once deleted, there is no going back..",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Bye-bye! Your comment has been eviscerated!", {
          icon: "success"
        });
        commentsService.deleteComment(userId, commentId, postId);
      } else {
        swal("Yeah, that's what I thought.");
      }
    });
  }
}

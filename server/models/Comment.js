import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
  {
    description: { type: String, required: true },
    upvote: { type: Number, required: true },
    downvote: { type: Number, required: true },

    postId: { type: ObjectId, ref: "Post", required: true }
    // TODO add user
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;

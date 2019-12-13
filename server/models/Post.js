import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String },
    rating: { type: Number },
    upvote: { type: Number, required: true },
    downvote: { type: Number, required: true }
    // TODO add user
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Post;

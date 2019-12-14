import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Post = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String },
    rating: { type: Number },
    upvote: { type: Number, required: true },
    downvote: { type: Number, required: true },

    userId: { type: ObjectId, ref: "User", required: true }
    // TODO add user
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Post;

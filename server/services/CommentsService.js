import mongoose from "mongoose";
import Comment from "../models/Comment";
import ApiError from "../Utils/ApiError";

const _repository = mongoose.model("Comment", Comment);

class CommentService {
  async create(rawData) {
    return await _repository.create(rawData);
  }

  async getCommentsByPostId(postId) {
    return await _repository.find({ postId });
  }

  async edit(id, update) {
    try {
      let data = await _repository.findOneAndUpdate({ _id: id }, update, {
        new: true
      });
      return data;
    } catch (error) {
      throw new ApiError("Invalid Update ID", 400);
    }
  }

  async delete(id) {
    try {
      let data = await _repository.findOneAndRemove({ _id: id });
    } catch (error) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const commentService = new CommentService();
export default commentService;

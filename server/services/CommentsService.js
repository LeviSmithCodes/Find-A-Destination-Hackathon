import mongoose from "mongoose";
import Comment from "../models/Comment";
import ApiError from "../Utils/ApiError";

const _repository = mongoose.model("Comment", Comment);

class CommentService {
  async create(obj, rawData) {
    // let parentId = await _repository.find({ postId: obj.postId, userId: obj.userId });
    rawData.userId = obj.userId;
    rawData.postId = obj.postId;
    let data = await _repository.create(rawData);
    return data;
  }

  async getCommentsByPostId(postId) {
    return await _repository.find({ postId });
  }

  async edit(obj, update) {
    try {
      let data = await _repository.findOneAndUpdate(
        { _id: obj.commentId, userId: obj.userId },
        update,
        {
          new: true
        }
      );
      return data;
    } catch (error) {
      throw new ApiError("Invalid Update ID", 400);
    }
  }

  async delete(obj) {
    try {
      return await _repository.findOneAndRemove({
        _id: obj.commentId,
        userId: obj.userId
      });
    } catch (error) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const commentService = new CommentService();
export default commentService;

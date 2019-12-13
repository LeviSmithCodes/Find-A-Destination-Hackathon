import mongoose from "mongoose";
import Post from "../models/Post";
import ApiError from "../Utils/ApiError";

const _repository = mongoose.model("Post", Post);

class PostService {
  async getAll() {
    return await _repository.find({});
  }

  async getById(id) {
    try {
      let data = await _repository.findById(id);
      return data;
    } catch (error) {
      throw new ApiError("Invalid ID", 400);
    }
  }

  async create(rawData) {
    return await _repository.create(rawData);
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

const postService = new PostService();
export default postService;

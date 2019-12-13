import mongoose from "mongoose";
import Post from "../models/Post";
import ApiError from "../Utils/ApiError";
import usersService from "./UsersService";

const _repository = mongoose.model("Post", Post);

class PostService {
  async getPostsByUserId(userId) {
    return await _repository.find({ userId });
  }
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

  async create(userId, rawData) {
    let user = await usersService.getById(userId);
    rawData.userId = user._id;
    let data = await _repository.create(rawData);
    return data;
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

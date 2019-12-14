import mongoose from "mongoose";
import User from "../models/User";
import ApiError from "../Utils/ApiError";

const _repository = mongoose.model("User", User);

class UserService {
  async getById(id) {
    try {
      let data = await _repository.findById(id);
      return data;
    } catch (error) {
      throw new ApiError("Invalid ID", 400);
    }
  }

  async getByName(name) {
    try {
      let data = await _repository.findOne({ name: name });
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

const userService = new UserService();
export default userService;

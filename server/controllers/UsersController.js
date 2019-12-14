import express from "express";
import postsService from "../services/PostsService";
import commentsService from "../services/CommentsService";
import usersService from "../services/UsersService";

export default class UsersController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("/:id", this.getById)
      .get("/:name", this.getByName)
      .get("/:id/posts", this.getPostsByUserId) //api/users/:id/posts
      .post("", this.create) //api/
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getById(req, res, next) {
    try {
      let data = await usersService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req, res, next) {
    try {
      let data = await usersService.getByName(req.params.name);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getPostsByUserId(req, res, next) {
    try {
      let data = await postsService.getPostsByUserId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await usersService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await usersService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await usersService.delete(req.params.id);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}

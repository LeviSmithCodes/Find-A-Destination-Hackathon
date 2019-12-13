import express from "express";
import postsService from "../services/PostsService";
import commentsService from "../services/CommentsService";

export default class PostsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id/comments", this.getCommentsByPostId)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getCommentsByPostId(req, res, next) {
    try {
      let data = await commentsService.getCommentsByPostId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      let data = await postsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await postsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await postsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await postsService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await postsService.delete(req.params.id);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}

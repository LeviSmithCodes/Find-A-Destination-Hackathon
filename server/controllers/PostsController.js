import express from "express";
import postsService from "../services/PostsService";
import commentsService from "../services/CommentsService";

export default class PostsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll) //api/:id/posts
      .get("/:id/comments", this.getCommentsByPostId)
      .get("/:id", this.getById)
      .post("/:id", this.create)
      .put("/:postId/:userId", this.edit) //pass both id's to find correct post and "authenticate" user
      .delete("/:postId/:userId", this.delete); // same as .put
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
      let data = await postsService.create(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      // Pass object with both postId and userId to postsService
      let data = await postsService.edit(
        { postId: req.params.postId, userId: req.params.userId },
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      // same as async edit
      let data = await postsService.delete({
        postId: req.params.postId,
        userId: req.params.userId
      });
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}

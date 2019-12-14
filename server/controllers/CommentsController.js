import express from "express";
import commentsService from "../services/CommentsService";

export default class CommentsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .post("/:postId/:userId", this.create)
      .put("/:commentId/:userId", this.edit)
      .delete("/:commentId/:userId", this.delete);
  }

  async create(req, res, next) {
    try {
      let data = await commentsService.create(
        { postId: req.params.postId, userId: req.params.userId },
        req.body
      );
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await commentsService.edit(
        { commentId: req.params.commentId, userId: req.params.userId },
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await commentsService.delete({
        commentId: req.params.commentId,
        userId: req.params.userId
      });
      if (!data) {
        throw new Error("Invalid Id");
      }
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}

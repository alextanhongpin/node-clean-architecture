import type { Comment } from "domain/models";

import type { CommentRepository, CreateParams } from "./repository";

type CreateRequest = Pick<Comment, "body" | "userId" | "postId">;

export class CommentUsecase {
  constructor(private repo: CommentRepository) {}

  async create(req: CreateRequest): Promise<Comment> {
    const comment = await this.repo.create({
      userId: req.userId,
      postId: req.postId,
      body: req.body,
    } as CreateParams);

    return comment;
  }
}

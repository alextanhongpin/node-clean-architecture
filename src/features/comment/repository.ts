import type { Comment } from "domain/models";

export type CreateParams = Pick<Comment, "body" | "userId" | "postId">;

export interface CommentRepository {
  create(params: CreateParams): Promise<Comment>;
}

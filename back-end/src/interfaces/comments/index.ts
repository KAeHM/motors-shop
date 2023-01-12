export interface IComment {
  message: string;
  userId: string;
}

export interface ICommentEdit {
  message: string;
  userId?: string;
}

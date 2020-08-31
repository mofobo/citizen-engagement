export interface IssueCommentModel {
  // A hyperlink reference to the user who posted the comment
  readonly autorHref: string;
  // The date at which the comment was posted
  readonly createdAt: Date;
  // A globally unique identifier of the comment
  readonly id: string;
  // The comment's text
  text: string;
}

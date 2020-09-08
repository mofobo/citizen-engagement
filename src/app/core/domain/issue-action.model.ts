export type IssueActionType = 'start' | 'reject' | 'resolve';

export interface IssueActionModel {
  // The date at which the action was performed
  readonly createdAt: Date;
  // A globally unique identifier of the action
  readonly id: string;
  // A hyperlink reference to the action
  readonly href: string;
  // A hyperlink reference to the issue on which the action was performed
  readonly issueHref: string;
  // An optional reason describing the action
  reason: string;
  // The type of action to perform on the issue
  type: IssueActionType;
  // A hyperlink reference to the staff user who performed the action
  readonly userHref: string;
}

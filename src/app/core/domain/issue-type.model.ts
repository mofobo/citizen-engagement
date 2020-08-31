export interface IssueTypeModel {
  // A globally unique identifier of the issue type
  readonly id: string;
  // A hyperlink reference to the issue type
  readonly href: string;
  // The globally unique name or the issue type
  name: string;
  // A detailed description of this type of issue
  description?: string;
  // An optional icon name (e.g. Font Awesome, Ionicons, etc)
  icon?: string;
  // An optional URL to an image or icon for the issue type
  imageUrl?: string;
}

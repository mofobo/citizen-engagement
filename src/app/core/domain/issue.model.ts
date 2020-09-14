import {GeoJSON} from 'leaflet';
import {UserModel} from './user.model';

export type IssueState = 'new' | 'inProgress' | 'rejected' | 'resolved';

export interface IssueModel {
  // 	A hyperlink reference to the staff user assigned to the issue (null for newly created issues)
  readonly assigneeHref: string;
  // The user assigned to the issue
  assignee: UserModel;
  // The date at which the issue was created
  readonly createdAt: Date;
  // A hyperlink reference to the user who reported the issue
  readonly creatorHref: string;
  // The user who reported the issue
  creator: UserModel;
  // An optional description of the issue
  description?: string;
  // A hyperlink reference to the issue
  readonly href: string;
  // A globally unique identifier of the issue
  readonly id: string;
  // An optional URL to a picture of the issue
  imageUrl?: string;
  // An optional array of additional picture URLs
  additionalImageUrls?: string[];
  // A hyperlink reference to an issue type (the ID alone is also a valid reference)
  issueTypeHref: string;
  // A GeoJSON point indicating the geographical coordinates of the issue
  location: GeoJSON;
  // The current state of the issue (new, inProgress, rejected or resolved)
  readonly state: IssueState;
  // An optional array of tag strings describing the issue
  tags: string[];
  // The date at which the issue was last updated (equal to createdAt for newly created issues)
  readonly updatedAt: Date;
}

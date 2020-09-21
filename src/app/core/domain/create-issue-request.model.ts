import {GeoJson} from './GeoJson';
import {UserModel} from "./user.model";

export interface CreateIssueRequestModel {
  createdAt?: Date;
  description?: string;
  imageUrl?: string;
  additionalImageUrls?: string[];
  issueTypeHref: string;
  assignee: UserModel;
  location: GeoJson;
  tags: string[];
}

import {GeoJson} from './GeoJson';

export interface ModifyIssueRequestModel {
  id: string;
  description?: string;
  issueTypeHref: string;
  location: GeoJson;
}

import {GeoJSON} from 'leaflet';

export interface CreateIssueRequestModel {
  createdAt: Date;
  description?: string;
  imageUrl?: string;
  additionalImageUrls?: string[];
  issueTypeHref: string;
  location: GeoJSON;
  tags: string[];
}

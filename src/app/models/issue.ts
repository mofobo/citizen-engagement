import {GeoJSON} from 'leaflet';

export class Issue {
  readonly assigneeHref: string;
  readonly createdAt: Date;
  readonly creatorHref: string;
  description?: string;
  readonly href: string;
  readonly id: string;
  imageUrl?: string;
  additionalImageUrls?: string[];
  issueTypeHref: string;
  location: GeoJSON;
  readonly state: string[];
  tags: string[];
  readonly updatedAt: Date;
}

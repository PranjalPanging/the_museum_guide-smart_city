export interface Exhibit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  period?: string;
  origin?: string;
}

export interface Museum {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  openingHours: string;
  closedOn: string;
  ticketPrice: {
    indian: number;
    foreigner: number;
    student?: number;
  };
  address: string;
  phone?: string;
  website?: string;
  category: string;
  rating: number;
  topExhibits: Exhibit[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface WishlistItem {
  id: string;
  user_id: string;
  museum_id: string;
  added_at: string;
}

export interface VisitedItem {
  id: string;
  user_id: string;
  museum_id: string;
  visited_at: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  museum_id: string;
  rating: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScannedArtifact {
  id: string;
  user_id: string;
  artifact_name: string;
  artifact_info: string | null;
  image_url: string | null;
  scanned_at: string;
}

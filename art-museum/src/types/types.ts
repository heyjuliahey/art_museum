interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

interface Favorite {
  title: string;
  artist: string;
  imageId: string;
}

interface FavoriteDetails {
  id: number;
  title: string;
  artist: string;
  image_id: string;
}

interface ApiResponse {
  pagination: {
    total: number;
    limit: number;
    current_page: number;
    total_pages: number;
  };
  data: Artwork[];
}

interface InfoState {
  id: number;
  title: string;
  artist: string;
  date: string;
}



export type {
  Artwork,
  FavoriteDetails,
  Favorite,
  Pagination,
  ApiResponse,
  InfoState,
};

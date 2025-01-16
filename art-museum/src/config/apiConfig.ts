const API_CONFIG = {
  BASE_URL: "https://api.artic.edu/api/v1/artworks",
  SEARCH_URL: "https://api.artic.edu/api/v1/artworks/search",
  DEFAULT_FIELDS:
    "id,image_id,title,artist_title,date_display,provenance_text,is_public_domain",
};

export const getArtworkUrl = (page: number, limit: number): string => {
  return `${API_CONFIG.BASE_URL}?page=${page}&fields=${encodeURIComponent(API_CONFIG.DEFAULT_FIELDS,)}&limit=${limit}`;
};

export const getSearchUrl = (input: string): string => {
  const trimmedValue = input.trim();
  return `${API_CONFIG.SEARCH_URL}?q=${encodeURIComponent(trimmedValue)}`;
};

export const getArtworkDetailUrl = (id: string | number): string => {
  return `${API_CONFIG.BASE_URL}/${id}`;
};

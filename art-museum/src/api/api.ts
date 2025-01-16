import axios from "axios";
import { toast } from "react-toastify";
import { Artwork, ApiResponse, FavoriteDetails } from "../types/types";
import { getArtworkUrl, getSearchUrl, getArtworkDetailUrl } from "../config/apiConfig";

const fetchArtworks = async (
  page: number,
  limit: number,
): Promise<{ artworks: Artwork[]; pagination: ApiResponse["pagination"] }> => {
  const url = getArtworkUrl(page, limit);
  try {
    const response = await axios.get<ApiResponse>(url);
    const artworks = response.data.data;
    const pagination = response.data.pagination;
    return { artworks, pagination };
  } catch (error) {
    toast.error("Error fetching artworks");
    return {
      artworks: [],
      pagination: { total: 0, limit, current_page: 1, total_pages: 1 },
    };
  }
};

const fetchValue = async (value: string): Promise<Artwork[]> => {
  try {
    const trimmedValue = value.trim().toLowerCase();
    const response = await fetch(
      getSearchUrl(trimmedValue)
    );
    const data = await response.json();

    const results = data.data.filter((art: Artwork) => {
      return art.title.toLowerCase().includes(trimmedValue);
    });

    const detailedResults = await Promise.all(
      results.map(async (art: Artwork) => {
        const details = await fetchFavoriteArtworkDetails(art.id);
        return details;
      }),
    );
    return detailedResults.filter((detail) => detail !== null) as Artwork[];
  } catch (error) {
    toast.error("Error fetching search results");
    return [];
  }
};

const fetchFavoriteArtworkDetails = async (
  id: number,
): Promise<FavoriteDetails | null> => {
  const url = getArtworkDetailUrl(id);
  try {
    const response = await axios.get<{ data: FavoriteDetails }>(url);
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching search results");
    return null;
  }
};

export default fetchArtworks;
export { fetchValue };
export { fetchFavoriteArtworkDetails };

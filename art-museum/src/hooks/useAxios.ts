import axios from "axios";

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

interface Artwork {
  id: number;
  title: string;
  date_display: string;
  provenance_text: string | null;
  artist_title: string;
  image_id: string;
}

interface ApiResponse {
  pagination: Pagination;
  data: Artwork[];
}

const useAxios = async (): Promise<Artwork[]> => {
  const url =
    "https://api.artic.edu/api/v1/artworks?page=1&fields=id%2Cimage_id%2Ctitle%2Cartist_title%2Cdate_display%2Cprovenance_text%2C+is_public_domain&limit=60";

  try {
    const response = await axios.get<ApiResponse>(url);
    const artworks = response.data.data;

    return artworks;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
};

export default useAxios;

import { fetchFavoriteArtworkDetails } from "../api/api";
import { toast } from "react-toastify";

export const addToFavorites = async (id:number): Promise<void> => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

    const isAlreadyFavorite = favorites.includes(id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, id];
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      const details = await fetchFavoriteArtworkDetails(id);

      if (details) {
        toast.success("Added to favorites");
      }
    }
  };

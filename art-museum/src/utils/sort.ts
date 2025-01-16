import { Artwork } from "../types/types";

export const sortArtworks = (
  artworks: Artwork[],
  sortValue: string,
): Artwork[] => {
  return [...artworks].sort((a, b) => {
    if (sortValue === "title") {
      return a.title?.localeCompare(b.title);
    } else if (sortValue === "artist") {
      return a.artist_title?.localeCompare(b.artist_title);
    }
    return 0;
  });
};

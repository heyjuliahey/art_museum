import { Artwork } from '../types/types';

export const filterArtworks = (artworks: Artwork[], searchInput: string): Artwork[] => {
  const trimmedValue = searchInput.trim().toLowerCase();
  return artworks.filter((art) => {
    return art.title.toLowerCase().includes(trimmedValue);
  });
};

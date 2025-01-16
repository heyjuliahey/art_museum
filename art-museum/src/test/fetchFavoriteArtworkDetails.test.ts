import axios from "axios";
import { toast } from 'react-toastify';
import { fetchFavoriteArtworkDetails } from "../api/api"

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('fetchFavoriteArtworkDetails', () => {
  const artworkId = 93780;
  const mockArtworkDetails = {
    id: 93780,
    title: 'Alexander Grant',
    artist_title: 'Cosmo Alexander',
    date_display: '1770',
    image_id: '2d717e79-f94a-83fd-0e18-3e1a82f85310',
  };

  it('should return artwork details when request was successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { data: mockArtworkDetails } });

    const result = await fetchFavoriteArtworkDetails(artworkId);
    expect(axios.get).toHaveBeenCalledWith('https://api.artic.edu/api/v1/artworks/93780');
    expect(result).toEqual(mockArtworkDetails);
  });

  it('should return null and show toast error when request failed', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    const result = await fetchFavoriteArtworkDetails(artworkId);
    expect(axios.get).toHaveBeenCalledWith('https://api.artic.edu/api/v1/artworks/93780');
    expect(result).toBeNull();
    expect(toast.error).toHaveBeenCalledWith('Error fetching search results');
  });
});

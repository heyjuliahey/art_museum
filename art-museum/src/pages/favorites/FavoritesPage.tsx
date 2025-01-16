import React, { useEffect, useState } from "react";
import "./FavoritesPage.scss";
import OtherItem from "../../components/other-works/OtherItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import { FavoriteDetails } from "../../types/types";
import { fetchFavoriteArtworkDetails } from "../../api/api";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      const favoriteArtworkIds: number[] = JSON.parse(
        sessionStorage.getItem("favorites") || "[]",
      );

      const artworkDetails: (FavoriteDetails | null)[] = await Promise.all(
        favoriteArtworkIds.map(async (id) => {
          const details = await fetchFavoriteArtworkDetails(id);
          return details ? details : null;
        }),
      );
      setFavorites(artworkDetails.filter((info) => info !== null));
      setLoading(false);
    };
    fetchFavoriteDetails();
  }, []);

  const removeFromFavorites = (id: number): void => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);

    const favoritesFromStorage = JSON.parse(
      sessionStorage.getItem("favorites") || "[]",
    );
    const updatedFavoritesFromStorage = favoritesFromStorage.filter(
      (storedId: number) => {
        storedId !== id;
      },
    );
    sessionStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavoritesFromStorage),
    );
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="favorites-text">
        <h1>
          Here Are Your <br />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="orange"
          >
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
          </svg>
          <span>Favorites</span>
        </h1>
        <div className="saved-by-you-text">
          <p>Saved by you</p>
          <span>Your favorites list</span>
        </div>
      </section>

      <div className="favorites-container">
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <OtherItem
                key={favorite.id}
                id={favorite.id}
                title={favorite.title}
                artist={favorite.artist}
                imageId={favorite.image_id}
                onClick={() => removeFromFavorites(favorite.id)}
              />
            ))
          ) : (
            <p className="no-fav-text">No favorites added yet.</p>
          )}
        </div>
      </div>
     <Footer/>
    </>
  );
};

export default FavoritesPage;

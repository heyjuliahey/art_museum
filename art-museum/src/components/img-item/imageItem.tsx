import React from "react";
import "./imageItem.css";
import { Link } from "react-router-dom";

interface ImageItemProps {
  title: string;
  artist: string;
  date: string;
  imageId: string;
}

const ImageItem: React.FC<ImageItemProps> = ({
  title,
  artist,
  imageId,
  date,
}) => {
  const addToFavorites = (): void => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");
    const newFavorite = { title, artist, imageId };

    const isAlreadyFavorite = favorites.some(
      (favorite: { title: string; artist: string; imageId: string }) =>
        favorite.title === newFavorite.title &&
        favorite.artist === newFavorite.artist &&
        favorite.imageId === newFavorite.imageId
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, newFavorite];
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <>
      <div className="card-container">
        <article className="card-article">
          <Link
            to={`/artwork/${title}/${imageId}`}
            state={{ title, artist, date }}
            key={imageId}
          >
            <img
              className="card-image"
              src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
              alt={title}
            />
          </Link>
          <div className="card-data">
            <div className="text-info-card">
              <h2 className="art-title">{title}</h2>
              <h3 className="artist-name">{artist}</h3>
            </div>
            <div className="fav-btn-card">
              <button onClick={addToFavorites} className="add-to-fav-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="orange"
                >
                  <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                </svg>{" "}
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ImageItem;

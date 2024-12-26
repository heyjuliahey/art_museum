import React from "react";
import "./OtherWorks.css";

interface ImageItemProps {
  title: string;
  artist: string;
  date: string;
  imageId: string;
  onClick?: () => void;
}

const OtherItem: React.FC<ImageItemProps> = ({
  title,
  artist,
  imageId,
  onClick,
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

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else {
      addToFavorites();
    }
  };

  return (
    <div className="other-card">
      <div className="other-card-image">
        <img
          src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
          alt={title}
        />
      </div>
      <div className="other-card-info">
        <p className="title">{title}</p>
        <p className="artist">{artist}</p>
      </div>
      <button onClick={handleButtonClick} className="add-to-fav-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="orange"
        >
          <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
        </svg>
      </button>
    </div>
  );
};

export default OtherItem;

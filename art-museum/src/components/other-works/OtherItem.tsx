import React from "react";
import "./OtherWorks.scss";
import { addToFavorites } from "../../utils/SessionStorage";

interface OtherItemProps {
  id: number;
  title: string;
  artist: string;
  imageId: string;
  onClick?: () => void;
}

const OtherItem: React.FC<OtherItemProps> = ({
  id,
  title,
  artist,
  imageId,
  onClick,
}) => {

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else {
      addToFavorites(id);
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

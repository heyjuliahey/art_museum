import React from "react";
import "./imageItem.scss";
import { Link } from "react-router-dom";
import { addToFavorites } from "../../utils/SessionStorage";

interface ImageItemProps {
  id: number;
  title: string;
  artist: string;
  date: string;
  imageId: string;
}

const ImageItem: React.FC<ImageItemProps> = ({
  id,
  title,
  artist,
  imageId,
  date,
}) => {
  return (
    <>
      <section className="card-container">
        <article className="card-article">
          <Link
            to={`/artwork/${title}/${imageId}`}
            state={{ id, title, artist, date }}
            key={imageId}
          >
            <img
              className="card-image"
              src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
            />
          </Link>
          <section className="card-data">
            <div className="text-info-card">
              <h2 className="art-title">{title}</h2>
              <h3 className="artist-name">{artist}</h3>
            </div>
            <div className="fav-btn-card">
              <button onClick={()=>addToFavorites(id)} className="add-to-fav-btn">
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
          </section>
        </article>
      </section>
    </>
  );
};

export default ImageItem;

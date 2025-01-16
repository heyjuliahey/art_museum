import React from "react";
import "./InfoPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import { InfoState } from "../../types/types";
import { addToFavorites } from "../../utils/sessionStorage";

const InfoPage: React.FC = () => {
  const { artist_title, image_id } = useParams<{
    artist_title: string;
    image_id: string;
  }>();

  const location = useLocation();
  const state = location.state as InfoState;
  const { id, title, artist, date } = state;

  return (
    <>
      <Navbar />
      <div className="info-container">
        <div className="fav-btn-card">
          <img
            src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
            alt={artist_title}
          />
          <button onClick={()=>addToFavorites(id)} className="info-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="orange"
            >
              <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
            </svg>
          </button>
        </div>

        <div className="info-text">
          <p>{title}</p>
          <span>{artist}</span>
          <h4>{date}</h4>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default InfoPage;

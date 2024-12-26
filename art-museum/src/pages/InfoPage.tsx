import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./InfoPage.css";

interface InfoState {
  title: string;
  artist: string;
  date: string;
}

const InfoPage: React.FC = () => {
  const { artist_title, image_id } = useParams<{
    artist_title: string;
    image_id: string;
  }>();
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("visible");
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.remove("visible");
  };

  const location = useLocation();
  const state = location.state as InfoState;
  const { title, artist, date } = state;

  const addToFavorites = (): void => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites") || "[]");

    const newFavorite = { title, artist, image_id };

    const isAlreadyFavorite = favorites.some(
      (favorite: { title: string; artist: string; image_id: string }) =>
        favorite.title === newFavorite.title &&
        favorite.artist === newFavorite.artist &&
        favorite.image_id === newFavorite.image_id
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, newFavorite];
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <>
      <nav>
        <ul className="sidebar">
          <li onClick={hideSidebar}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Your favorites</Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to="/">Museum of Art</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/favorites">Your favorites</Link>
          </li>
          <li className="menu-button" onClick={showSidebar}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <div className="info-container">
        <div className="fav-btn-card">
          <img
            src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
            alt={artist_title}
          />
          <button onClick={addToFavorites} className="info-btn">
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

      <footer className="footer">
        <div className="footer-container">
          <div className="museum-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
            </svg>{" "}
            <p>
              Museum of <span>Art</span>
            </p>
          </div>
          <div className="modsen-logo">
            <h2>Modsen</h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default InfoPage;
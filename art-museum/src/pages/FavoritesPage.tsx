import React, { useEffect, useState } from "react";
import OtherItem from "../components/other-works/OtherItem";
import { Link, useLocation } from "react-router-dom";
import "./FavoritesPage.css";

interface Favorite {
  title: string;
  artist: string;
  imageId: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      sessionStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (
    title: string,
    artist: string,
    imageId: string
  ): void => {
    const updatedFavorites = favorites.filter(
      (favorite) =>
        !(
          favorite.title === title &&
          favorite.artist === artist &&
          favorite.imageId === imageId
        )
    );

    setFavorites(updatedFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.remove("visible");
  };
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("visible");
  };

  const location = useLocation();

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
            <Link to={location.pathname}>Your favorites</Link>
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
            <Link to={location.pathname}>Your favorites</Link>
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
        <div>
          <p>Saved by you</p>
          <span>Your favorites list</span>
        </div>
      </section>

      <div className="favorites-container">
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <OtherItem
                key={index}
                title={favorite.title}
                artist={favorite.artist}
                date=""
                imageId={favorite.imageId}
                onClick={() =>
                  removeFromFavorites(
                    favorite.title,
                    favorite.artist,
                    favorite.imageId
                  )
                }
              />
            ))
          ) : (
            <p className="no-fav-text">No favorites added yet.</p>
          )}
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

export default FavoritesPage;
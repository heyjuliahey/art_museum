import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("visible");
  };

  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.remove("visible");
  };

  return (
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

      <ul className="navigation-links">
        <li>
          <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z"/></svg>Museum of Art</Link>
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
  );
};

export default Navbar;

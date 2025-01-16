import "./NotFound.scss";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const pageLocation = useLocation();

  return (
  <>
    <div className="not-found-container">
      <h1>
        <span>Page</span> Not found
      </h1>
      <p>URL <code>{pageLocation.pathname}</code> was not found.</p>
    </div>
  </>
  )
};

export default NotFound;

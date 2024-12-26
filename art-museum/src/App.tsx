import Navbar from "./components/navbar/Navbar";
import ImageList from "./components/img-list/imageList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfoPage from "./pages/InfoPage";
import FavoritesPage from "./pages/FavoritesPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <ImageList />
            </>
          }
        />
        <Route path="/artwork/:artist_title/:image_id" element={<InfoPage />} />
        <Route path="/favorites" element={<FavoritesPage />}></Route>
        <Route path="/artwork/:artist_title/:imageId`" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
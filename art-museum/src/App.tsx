import Navbar from "./components/navbar/Navbar";
import ImageList from "./components/img-list/imageList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfoPage from "./pages/info/InfoPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  return (
    <BrowserRouter basename="/art_museum">
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import ImageItem from "../img-item/imageItem";
import Pagination from "../pagination/Pagination";
import OtherItem from "../other-works/OtherItem";
import fetchArtworks from "../../api/api";
import Loader from "../loader/Loader";
import Footer from "../footer/Footer";
import { Artwork } from "../../types/types";
import { fetchValue } from "../../api/api";
import { sortArtworks } from "../../utils/sort";
import { paginate } from "../../utils/pagination";
import { ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "./imageList.scss";

const ImageList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [arts, setArts] = useState<Artwork[]>([]);
  const [sortValue, setSortValue] = useState<string>("title");
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    const fetchArtwork = async () => {
      const { artworks: artworksData, pagination } = await fetchArtworks(
        currentPage,
        60,
      );
      setTotalPosts(pagination.limit);
      setArts(artworksData);
      setArtworks(artworksData);
      setLoading(false);
    };
    fetchArtwork();
  }, [totalPosts]);

  const sortedArts = sortArtworks(arts, sortValue);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

  const handleChange = (value: string) => {
    const validatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    setInput(validatedValue);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedInput.trim() === "") {
        const { artworks: artworksData } = await fetchArtworks(currentPage, 60);
        setArts(artworksData);
        setLoading(false);
      } else {
        const searchResults = await fetchValue(debouncedInput);
        setArts(searchResults);
        setCurrentPage(1);
      }
    };
    fetchSearchResults();
  }, [debouncedInput]);

  const currentPosts = paginate(sortedArts, currentPage, postsPerPage);
  
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };
  

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
    <ToastContainer/>
      <section className="flex-container">
        <h1 className="header-1">
          Let's Find Some <span>Art</span>
          <br /> Here!
        </h1>

        <div className="search-container">
          <input
            className="input-main-page"
            type="search"
            placeholder="Search Art, Artist, Work..."
            onChange={handleInputChange}
            value={input}
          />
        </div>
      </section>

      <section className="sort-container">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortValue} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
        </select>
      </section>

      <section className="gallery-text">
        <span>Topics for you</span>
        <h1>Our special gallery</h1>
      </section>

      <>
        {
          currentPosts.length > 0 ? (
            <div className="image-list">
              {currentPosts.map((artwork) => (
                <ImageItem
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  artist={artwork.artist_title}
                  date={artwork.date_display}
                  imageId={artwork.image_id}
                />
              ))}
            </div>
          ) : (
            <div className="not-found"
            >
              No artworks found.
            </div>
          )
        }
      </>

      <section className="pagination-container">
        <Pagination
          totalPosts={arts.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>

      <section className="gallery-text">
        <span>Here some more</span>
        <h2>Other works for you</h2>
      </section>

      <section className="others">
        {artworks.slice(-9).map((artwork) => (
          <OtherItem
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            artist_title={artwork.artist_title}
            imageId={artwork.image_id}
          />
        ))}
      </section>
      <Footer />
    </>
  );
};

export default ImageList;

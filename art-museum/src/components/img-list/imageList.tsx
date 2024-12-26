import React, { useEffect, useState } from "react";
import ImageItem from "../img-item/imageItem";
import "./imageList.css";
import Pagination from "../Pagination";
import useAxios from "../../hooks/useAxios";
import OtherItem from "../other-works/OtherItem";
import Loader from "../Loader";

interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
}

const ImageList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [input, setInput] = useState("");
  const [arts, setArts] = useState<Artwork[]>([]);
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("title");

  useEffect(() => {
    const fetchArtworks = async () => {
      const artworksData = await useAxios();
      setArtworks(artworksData);
      setLoading(false);
      setArts(artworksData);
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput === "") {
      setArts(artworks);
    } else {
      setArts(
        artworks.filter((art) =>
          art.title.toLowerCase().includes(debouncedInput.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, [debouncedInput, artworks]);

  const sortedArts = [...arts].sort((a, b) => {
    if (sortValue === "title") {
      return a.title?.localeCompare(b.title);
    } else if (sortValue === "artist") {
      return a.artist_title?.localeCompare(b.artist_title);
    } 
    return 0;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = sortedArts.slice(firstPostIndex, lastPostIndex);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="flex-container">
        <h1 className="header-1">
          Let's Find Some <span>Art</span>
          <br /> Here!
        </h1>
        <div className="search-container">
          <input
            className="input-main-page"
            type="search"
            placeholder="Search Art, Artist, Work..."
            onChange={handleFilter}
            value={input}
          />
        </div>
      </div>

      <div className="sort-container">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" value={sortValue} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
        </select>
      </div>

      <div className="gallery-text">
        <span>Topics for you</span>
        <h1>Our special gallery</h1>
      </div>

      <div className="image-list">
        {currentPosts.map((artwork) => (
          <ImageItem
            key={artwork.id}
            title={artwork.title}
            artist={artwork.artist_title}
            date={artwork.date_display}
            imageId={artwork.image_id}
          />
        ))}
      </div>

      <div className="pagination-container">
        <Pagination
          totalPosts={arts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="gallery-text">
        <span>Here some more</span>
        <h2>Other works for you</h2>
      </div>

      <div className="others">
        {artworks.slice(-9).map((artwork) => (
          <OtherItem
            key={artwork.id}
            title={artwork.title}
            artist={artwork.artist_title}
            date={artwork.date_display}
            imageId={artwork.image_id}
          />
        ))}
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

export default ImageList;

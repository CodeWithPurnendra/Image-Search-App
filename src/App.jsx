import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

function Search() {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchImages = async () => {
    if (!debounceQuery) {
      setImages([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${debounceQuery}&per_page=15`,
        {
          headers: {
            Authorization:
              "LLOJcufHneum1v3p3WTbo8YHRiqUhuFzfKXfKsZb5zzIOJUDeDr3FoXm",
          },
        }
      );
      const data = await res.json();
      setImages(data.photos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [debounceQuery]);

  return (
    <div className="search-container">
      {/* Search bar with icon */}
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search beautiful images..."
          className="search-input"
        />
      </div>

      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <p>Fetching stunning images...</p>
        </div>
      )}

      <div className="image-grid">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src.medium}
            alt={image.alt || "image"}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;

import { useEffect, useState } from "react";

const SearchUi = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [cache, setCache] = useState({});
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isResultVisible) return;

      switch (e.key) {
        case 'ArrowDown':
          setHighlightedIndex((prevIndex) =>
            prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case 'ArrowUp':
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
          break;
        case 'Enter':
          if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
            setSearchText(searchResults[highlightedIndex]);
            setHighlightedIndex(-1); // Reset highlighted index
            setIsResultVisible(false); // Hide the results list
          }
          break;
        case 'onClick' :
          if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
            setSearchText(searchResults[highlightedIndex]);
            setHighlightedIndex(-1); // Reset highlighted index
            setIsResultVisible(false); // Hide the results list
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [highlightedIndex, searchResults, isResultVisible]);

  useEffect(() => {
    //Debouncing
    const s = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(s);
  }, [searchText]);



  const fetchData = async () => {
    if (cache[searchText]) {
      setSearchResults(cache[searchText]);
    } else {
      const data = await fetch(
        "https://www.google.com/complete/search?client=firefox&q=" + searchText
      );
      const json = await data.json();
      console.log(json[1]);
      cache[searchText] = json[1];
      setSearchResults(json[1]);
    }
  };

  const handleItemClick = (item) => {
    setSearchText(item);
    setIsResultVisible(false);
    console.log("hiiimm")
  };

  return (
    <div className="m-10">
      <input
        type="text"
        className=" border border-black p-2 w-96 shadow-lg"
        placeholder="search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsResultVisible(true)}
       onBlur={() => setTimeout(() => setIsResultVisible(false), 200)}
        onClick={()=> setIsResultVisible(true)}
      />
      {searchResults.length > 1 && isResultVisible && (
        <ul className="p-2 border border-black w-96 shadow-lg">
          {searchResults.map((r, index) => (
            <li
              className={`hover:bg-gray-200 cursor-pointer ${index === highlightedIndex ? 'bg-gray-200' : ''}`}
              onClick={() => handleItemClick(r)}
              key={r}
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchUi;

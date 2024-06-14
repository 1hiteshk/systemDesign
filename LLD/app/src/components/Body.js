import { useEffect, useState } from "react";
import { MemeCard } from "./MemeCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [showShimmer, setShowShimmer] = useState(false);
// not needed state if loading is only for initial load but now we have to show loading screen multiple
// times to control the loading state it depends on data layer on api call response
  useEffect(() => {
    fetchMemes();

    window.addEventListener("scroll", handleScroll);
// whenever we are adding event listener to our page we should make sure to clean it up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    //scrollY - how much I have scrolled
    // innerHeight - heigh of the window(visible setion)
    // document.body.scrollHeight - total height of the web page
    // used for infinite scroll
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      fetchMemes();
    }
  };

  const fetchMemes = async () => {
    setShowShimmer(true); // when fetching data show loading screen, also when loading data onScroll at bottom
    // we are using state variable to show shimmer loading UI
    const data = await fetch("https://meme-api.com/gimme/20");
    const json = await data.json();
   // every time data loads shimmer is shown
    setShowShimmer(false); // when as soon as api call is made we got response, make shimmer load false
    // add more data to the page
    console.log(json);
    setMemes((memes) => [...memes, ...json.memes]);
  };

  return (
    <div className="flex flex-wrap">
      {memes.map((meme, i) => (
        <MemeCard key={i} data={meme} />
      ))}

      {showShimmer && <Shimmer />}
    </div>
  );
};
export default Body;

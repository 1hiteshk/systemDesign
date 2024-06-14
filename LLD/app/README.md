## window.innerHeight
the visible height of the screen or window web page

## document.body.scrollHeight
the whole height of the body / screen / height of whole document

## window.scrollY
how much you have scrolled the web page in Y axis

## document.body.scrollHeight = window.innerHeight + window.scrollY

## document.body.scrollHeight == window.innerHeight + window.scrollY
this means we have reached the end of the page , it gives true otherwise false

**  whenever we are adding event listener to our page we should make sure to clean it up
in useEffect,    return () => window.removeEventListener("scroll", handleScroll);

 //scrollY - how much I have scrolled
 // innerHeight - heigh of the window(visible setion)
 // document.body.scrollHeight - total height of the web page
 // used for infinite scroll

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
    setMemes((memes) => [...memes, ...json.memes]);
  };

   const [showShimmer, setShowShimmer] = useState(false);
// not needed state if loading is only for initial load but now we have to show loading screen multiple
// times to control the loading state it depends on data layer on api call response

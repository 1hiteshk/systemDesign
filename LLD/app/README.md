## window.innerHeight

the visible height of the screen or window web page

## document.body.scrollHeight

the whole height of the body / screen / height of whole document

## window.scrollY

how much you have scrolled the web page in Y axis

## document.body.scrollHeight = window.innerHeight + window.scrollY

## document.body.scrollHeight == window.innerHeight + window.scrollY

this means we have reached the end of the page , it gives true otherwise false

\*\* whenever we are adding event listener to our page we should make sure to clean it up
in useEffect, return () => window.removeEventListener("scroll", handleScroll);

//scrollY - how much I have scrolled
// innerHeight - heigh of the window(visible section)
// document.body.scrollHeight - total height of the web page
// used for infinite scroll

const handleScroll = () => {
//scrollY - how much I have scrolled
// innerHeight - heigh of the window(visible section)
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

### server side pagination

offset pagination
api - /products ? - page = 2 - count(Limit) = 20
`this is offset page` - offset = 20*page (`skip 20*pages records to get the data` || "skipping that much data") - static data where , not frequent changes in data - it is like linked list to get the data and skip some data

- we should know total count , so we get to know how many pages are there that we can fetch

### cursor pagination (introduced by Fb. )

- new users registered in meantime and all data shifted in pages , page 1, 2, 3, shifted with same count and offset , so repetitive data seen problem in server side pagination , here inconsistency in UI when we move from 1 page to another we can see duplicate data coz new user registered, this is a major problem in offset pagination (when data is dynamic it changes very frequently) also it can skip or not show you data in case if users are deleted .
  - real time (dynamic data)
  - faster than offset pagination coz time complexity is less coz of cursor from there onwards we have to get the data (like array and we can directly jump to the dta)
  - cursor pagination is like an array directly find the cursor O(1)
  - offset pagination is like an linked list coz first we have to skip those entries then get the data O(N), so cursor pagination is fast.
  - no repetitive data (duplicacy)
  - no skipping data
- in offset pagination limit=4
- cursor pagination
  - [1,2,3...16]
  - cursor = 9(unique value )
  - limit = 4
  - {9,10,11,12} fetch data from cursor 9, to 4 records ahead
  - if new data added on top/bottom [17] we have cursor =9 & limit=4 we would get the same data but not in offset pagination
  - wherever is your cursor (in the table) give me the next 4 data from there
  - not much diff. in F.E but diff. in B.E and API dealing
  - cursor is generally timestamp (unique timestamp for every entry) ,cursor can be ID
  - cursor is unique
  - used in social media platform
    Cons
  * tied with infinte scroll
  * doesn't keep track of pages
  * data can grow at any level and can we get next 10 data after the cursor
  * can't implement sorting of data (in social media apps there is no option to sort by name of author)
  * trickier to implement in B.E
  *

setCurrentPage(currentPage - 1);
// this can give us inconsistencies in our code, suppose we are changing the currentPage and the next value also depend on your currentPage only , the same variable that you are changing , so basically you are trying to update the same variable using the function and using the same value , so sometimes reacts get confused and gives you unexpected results

// to do this properly react gives a optional way
// make a cb. function like this , to get the correct answer like currentPage -1
setCurrentPage((currentPage) => currentPage - 1);

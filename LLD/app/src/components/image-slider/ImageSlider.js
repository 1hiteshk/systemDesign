import { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
    "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
    "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
  ];
  const [active, setActive] = useState(0);

  // to change bg image after every 3 seconds
  useEffect(() => {
    const i = setInterval(() => {
      loadNextImage();
    }, 3000);

    // always remove event listeners and setTImeout intervals ,i.e repetitive thing
    // remove them whenever we are unloading our page (in SPA or in react we have to do this) whenever we are going away from our page
    // don't need to do this in js coz of single pager app.n
    return () => {
      clearInterval(i); // when component unmounts from the page
    };
  }, []);

  const loadNextImage = () => {
    setActive((active) => (active + 1) % images.length); // when last image so use modular 2%5 === 2
  };
  const loadPrevImage = () => {
    setActive((active) => (active - 1 < 0 ? images.length - 1 : active - 1)); //first img to prev. so its last img
  };

  return (
    <div>
      <div className="m-2 p-2 flex justify-center items-center">
        <img
          onClick={loadPrevImage}
          className="w-20 h-20 cursor-pointer"
          alt="left arrow"
          src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
        />
        <img
          className="w-[700px] h-[400px]"
          src={images[active]}
          alt="wallpaper"
        />
        <img
          onClick={loadNextImage}
          className="w-20 h-20 cursor-pointer"
          alt="right arrow"
          src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
        />
      </div>
    </div>
  );
};
export default ImageSlider;

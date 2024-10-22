import React from "react";
import { AlumniSlider, Carousel, ExploreCards, ImageGallery, NewsroomEvents, WelcomeBanner } from "../../components";
const Home = () => {
  return (
    <>
    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi magnam esse quia ipsum facilis illo aut laboriosam, cumque, ut minima, aliquid quo obcaecati? Saepe magnam eum, mollitia odio voluptate eaque! */}
      <Carousel />
      <WelcomeBanner/>
      <ExploreCards/>
      <NewsroomEvents/>
      <ImageGallery/>
      <AlumniSlider/>
    </>
  );
};

export default Home;

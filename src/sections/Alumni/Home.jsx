import React from "react";
import {
  AlumniSlider,
  Carousel,
  ExploreCards,
  ImageGallery,
  NewsroomEvents,
  WelcomeBanner,
  Header,
  Footer,
  NavBar,
} from "../../components";
const Home = () => {
  return (
    <>
      <Header />
      <Carousel />
      <WelcomeBanner />
      <ExploreCards />
      <NewsroomEvents />
      <ImageGallery />
      <AlumniSlider />
      <Footer />
      <NavBar/>
    </>
  );
};

export default Home;

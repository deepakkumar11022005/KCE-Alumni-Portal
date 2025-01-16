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
import './Home.css'
const Home = () => {
  return (
    <div className="home-class">

      <Header />
      <Carousel />
      <WelcomeBanner />
      <ExploreCards />
      <NewsroomEvents />
      <ImageGallery />
      <AlumniSlider />
      <Footer />
      <NavBar/>
    </div>
  );
};

export default Home;

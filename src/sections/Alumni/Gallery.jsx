import React, { useState } from "react";
import "./Gallery.css";
import { Footer, Header, NavBar } from "../../components";

const images = [
  {
    src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 1",
    date: "2024-01-01",
    description: "Description for image 1.",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 2",
    date: "2024-01-02",
    description: "Description for image 2.",
  },
  {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 3",
    date: "2024-01-03",
    description: "Description for image 3.",
  },
  {
    src: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 4",
    date: "2024-01-04",
    description: "Description for image 4.",
  },
  {
    src: "https://images.unsplash.com/photo-1489365091240-6a18fc761ec2?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 5",
    date: "2024-01-05",
    description: "Description for image 5.",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 6",
    date: "2024-01-06",
    description: "Description for image 6.",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 7",
    date: "2024-01-07",
    description: "Description for image 7.",
  },
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 9",
    date: "2024-01-09",
    description: "Description for image 9.",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 17",
    date: "2024-01-17",
    description: "Description for image 17.",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 19",
    date: "2024-01-19",
    description: "Description for image 19.",
  },
  {
    src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 22",
    date: "2024-01-22",
    description: "Description for image 22.",
  },
  {
    src: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 23",
    date: "2024-01-23",
    description: "Description for image 23.",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 26",
    date: "2024-01-26",
    description: "Description for image 26.",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 27",
    date: "2024-01-27",
    description: "Description for image 27.",
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=668&q=80",
    title: "Image Title 28",
    date: "2024-01-28",
    description: "Description for image 28.",
  },
];

const Gallery = ({alumniAuthData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <Header alumniAuthData={alumniAuthData}/>
      <div className="gall">
      
        <div className="gallery-header">
        <h1 className="gallery-title">Alumni Gallery</h1>
          <p className="gallery-subtitle">Showcasing Alumni Success Stories</p>
        </div>

        <div className="gallery-container">
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openModal(index)}
              >
                <img
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                />
                <div className="image-info">
                  <h2>{image.title}</h2>
                  <p>{image.date}</p>
                </div>
              </div>
            ))}
          </div>

          {modalOpen && (
            <div className="modal">
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <div className="modal-content">
                <img
                  src={images[currentIndex].src}
                  alt={`Modal image ${currentIndex + 1}`}
                  className="modal-image"
                />
                <div className="modal-description">
                  <h2>{images[currentIndex].title}</h2>
                  <p>{images[currentIndex].date}</p>
                  <p>{images[currentIndex].description}</p>
                  <div className="btn-contaiers">
                    <button className="modal-prev" onClick={prevImage}>
                      Previous
                    </button>
                    <button className="modal-next" onClick={nextImage}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <NavBar />
    </>
  );
};

export default Gallery;

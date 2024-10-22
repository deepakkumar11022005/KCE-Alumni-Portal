import React from 'react';
import './ImageGallery.css';

const LINK_URL = "https://example.com"; // Replace with your desired URL

const images = [
    "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1502865787650-3f8318917153?auto=format&fit=crop&w=334&q=80",
    "https://images.unsplash.com/photo-1500816558239-6b91f4256ead?auto=format&fit=crop&w=331&q=80",
    "https://images.unsplash.com/photo-1487376318617-f43c7b41e2e2?auto=format&fit=crop&w=750&q=80",
    "https://images.unsplash.com/photo-1497888329096-51c27beff665?auto=format&fit=crop&w=751&q=80",
    "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=334&q=80",
    "https://images.unsplash.com/photo-1502550900787-e956c314a221?auto=format&fit=crop&w=334&q=80",
    // "https://images.unsplash.com/photo-1455853659719-4b521eebc76d?auto=format&fit=crop&w=750&q=80"
];

const ImageGallery = () => {
    return (
        <>
            <div className='gallery-cont'>
                <h1 className="heading-with-bg">Our Alumni Gallery</h1>
                <div className="image-gallery-container">
                    {images.map((image, index) => (
                        <a key={index} href={LINK_URL} className="image-gallery-item">
                            <img src={image} alt={`Gallery image ${index + 1}`} className="image-gallery-img" />
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageGallery;

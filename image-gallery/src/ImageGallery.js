import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageGallery.css';
 // Make sure to create this CSS file
 const apiKey = process.env.REACT_APP_API_KEY;

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const imagesPerPage = 12;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/curated?per_page=100`, {
                    headers: {
                        Authorization: apiKey,
                    },
                });
                setImages(response.data.photos);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const displayImages = () => {
        const start = currentIndex * imagesPerPage;
        const end = start + imagesPerPage;
        return images.slice(start, end).map((image) => (
            <img
                key={image.id}
                src={image.src.medium}
                alt={image.alt}
                onClick={() => setSelectedImage(image.src.original)} // Set selected image on click
            />
        ));
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < Math.ceil(images.length / imagesPerPage) - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const closeModal = () => {
        setSelectedImage(null); // Close the modal
    };

    return (
        <div className="gallery-container">
            <div className="image-gallery">
                {displayImages()}
            </div>
            <button className="nav-button" onClick={handlePrev} disabled={currentIndex === 0}>
                Previous
            </button>
            <button className="nav-button" onClick={handleNext} disabled={currentIndex >= Math.ceil(images.length / imagesPerPage) - 1}>
                Next
            </button>

            {/* Modal for full-screen image */}
            {selectedImage && (
                <div className="modal" onClick={closeModal}>
                    <img src={selectedImage} alt="Full Screen" className="modal-image" />
                </div>
            )}
        </div>
    );
};

export default ImageGallery;

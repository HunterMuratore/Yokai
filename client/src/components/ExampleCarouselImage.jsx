import React from 'react';

function ExampleCarouselImage({ images }) {
    return (
        <div>
            {/* Displaying multiple images in the carousel */}
            {images && images.map((image, index) => (
                <img key={index} className="carimg img-fluid" src={image} alt={`Slide ${index + 1}`} />
            ))}
        </div>
    );
}

export default ExampleCarouselImage;

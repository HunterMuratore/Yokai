import React from 'react';
import testimg from '../assets/images/test-img.jpg'

// ExampleCarouselImage component
function ExampleCarouselImage(props) {
    return (
        <div>
            {/* Your image content or JSX for the carousel image */}
            {/* For example: */}
            <img className="carimg img-fluid" src={testimg} alt={props.altText} />
        </div>
    );
}

export default ExampleCarouselImage;

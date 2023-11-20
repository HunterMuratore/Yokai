import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ExampleCarouselImage from '../components/ExampleCarouselImage.jsx'; // Adjust the path as per your project's structure

function Home() {
    const products = [
        {
            name: 'Product Name 1',
            description: 'Product Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corrupti ratione quos facilis! Aliquam tenetur consequuntur odit, architecto tempore fuga aperiam fugiat obcaecati? Impedit nesciunt blanditiis delectus, sint culpa earum!',
            price: '19.99',
        },
        {
            name: 'Product Name 2',
            description: 'Product Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corrupti ratione quos facilis! Aliquam tenetur consequuntur odit, architecto tempore fuga aperiam fugiat obcaecati? Impedit nesciunt blanditiis delectus, sint culpa earum!',
            price: '34.99',
        },
        {
            name: 'Product Name 3',
            description: 'Product Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corrupti ratione quos facilis! Aliquam tenetur consequuntur odit, architecto tempore fuga aperiam fugiat obcaecati? Impedit nesciunt blanditiis delectus, sint culpa earum!',
            price: '99.99',
        },
        {
            name: 'Product Name 4',
            description: 'Product Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corrupti ratione quos facilis! Aliquam tenetur consequuntur odit, architecto tempore fuga aperiam fugiat obcaecati? Impedit nesciunt blanditiis delectus, sint culpa earum!',
            price: '29.99',
        },
        {
            name: 'Product Name 5',
            description: 'Product Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corrupti ratione quos facilis! Aliquam tenetur consequuntur odit, architecto tempore fuga aperiam fugiat obcaecati? Impedit nesciunt blanditiis delectus, sint culpa earum!',
            price: '9.99',
        },
    ];

    return (
        <>
            <Carousel className="mt-3" fade>
                <Carousel.Item interval={3000}>
                    <ExampleCarouselImage text="First slide" />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <ExampleCarouselImage text="Second slide" />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <ExampleCarouselImage text="Third slide" />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="d-flex flex-wrap justify-content-center mt-5 gap-4 my-3">
                {products.map((product, index) => (
                    <Card key={index} style={{ width: '18rem' }} className="mb-3">
                        <ExampleCarouselImage />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>${product.price}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Link to Product</Card.Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Home;

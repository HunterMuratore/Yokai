import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import clothes from '../assets/images/clothesUPD.png';
import furinture from '../assets/images/furnitureUPD.png';
import gaming from '../assets/images/gamingUPD.png';

import { gql, useQuery } from "@apollo/client";

const GET_ALL_WISHLISTS = gql`
query getAllWishlists {
    getAllWishlists {
        _id
        name
        products
        user
    }
}
`

function Home() {
    const images = [clothes, furinture, gaming];
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
            <div className="carousel-container mt-4">
                <Carousel fade>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="w-100"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="d-flex flex-wrap justify-content-center mt-4 gap-4 my-3">
                {products.map((product, index) => (
                    <Card key={index} style={{ width: '18rem' }} className="mb-3">
                        <Card.Img variant="top" src={gaming} />
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

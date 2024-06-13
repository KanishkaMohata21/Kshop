import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Image1 from '../../assets/Image1.jpg';
import Image2 from '../../assets/Image2.jpg';
import Image3 from '../../assets/Image3.jpg';
import Image4 from '../../assets/Image4.jpg';
import Image5 from '../../assets/Image5.jpg';
import Image6 from '../../assets/Image6.jpg';
import Image7 from '../../assets/Image7.jpg';



export default function Hero(){
    const images = [
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
        Image6,
        Image7,
    ];

    const carouselItems = images.map((image, index) => (
        <img key={index} src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '300px' }} />
    ));

    return (
        <Carousel className='carImages' animation="slide" autoPlay={true} indicators={false} >
            {carouselItems}
        </Carousel>
    );
}

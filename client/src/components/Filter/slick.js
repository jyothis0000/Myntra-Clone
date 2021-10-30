import React from 'react'
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick/lib';

export default function slick(props) {

    const settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase:'linear',
        pauseOnHover:true,
        playOnHover:true
    }
    return (
        <div>
        <Slider style={{width:"100%",position:"relative",left:"-7px"}} {...settings}> 
        {props.slickimage}
        </Slider>             
        </div>
    )
}

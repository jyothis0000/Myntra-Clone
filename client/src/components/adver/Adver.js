import React, { Component } from 'react'
import TextCarousel from 'react-text-carousel';

export default class Adver extends Component {
    render() {
            const phrases = ["An array", "of strings", "to pass the component"]; // Required
            const interval = 3000; // The time to wait before rendering the next string
            const typistProps = {} 

        return (
            <div>
            <h1>react-text-carousel</h1>
             A sentence with some<TextCarousel phrases={phrases} interval={interval} typistProps={typistProps} />.                
            </div>
        )
    }
}

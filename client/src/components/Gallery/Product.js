import React, { Component } from 'react'
import {CardImg,Card,CardTitle,CardSubtitle} from 'reactstrap'

class Img extends Component {
    render() {
        return (
            <a href={`${this.props.link}`} className="cardlink">
                <Card className="Gallerycard newcon">  
                    <CardImg top width="100%" height="400px" src={this.props.image} alt="Card image cap" />
                    <div className="overlay">
                      <CardTitle className="gallerytext"><h2><b>{this.props.name}</b></h2></CardTitle> 
                      <CardSubtitle className="gallerytext"><h6><b>{this.props.hint}</b></h6></CardSubtitle> 
                    </div>
                </Card>
            </a>
        )
    }
};

export default Img;


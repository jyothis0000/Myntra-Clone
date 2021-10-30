import React from 'react'
import util from '../../util'
import Slider from './slick'
import { Card, Row, Col, Button} from 'react-bootstrap'

function FilterCard(props) {

  const numberFormat = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0
  }).format(value);

    return (
      <Col className="col-lg-3 col-md-4 clo-sm-6 filterCard">
         <Card className="f-con">
          <a href={`mens-t-shirt/${props.code}`}>
          <Slider style={{width:"100%"}} slickimage={props.image} />
          <Card.Body>
            <Card.Title><b>{props.name}</b></Card.Title>
            <Card.Text>{props.des}</Card.Text>
            <Card.Text><b>{numberFormat(props.price)}</b></Card.Text>
          </Card.Body>
          <div class="f-overlay">
            <Row>
              <Col className="f-but"><Button variant="outline-success">ADDBAG</Button></Col>
              <Col className="f-but" style={{position:"relative",right:"15px"}}><Button variant="outline-info">Wishlist</Button></Col>
            </Row>
            <br />
            <Card.Text className="gallerytext1"><span><h6>{props.des}</h6></span></Card.Text> 
            <Card.Text className="gallerytext1"><span>size:{ props.size }</span></Card.Text>
            <Card.Text className="gallerytext1"><h5><b>{util.formatCurrency(props.price)}</b></h5></Card.Text>
            </div>
            </a> 
        </Card>
        </Col>
    )
}

export default FilterCard          

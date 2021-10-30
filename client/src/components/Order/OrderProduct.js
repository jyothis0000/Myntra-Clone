import React, { useEffect, useState } from 'react'
import SideBar from './OrderSiteBar'
import Axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Container, Row, Col, Card} from 'react-bootstrap'

export default function orderSite(props) {
const [detail, setDetail] = useState([])

const token = localStorage.usertoken;
const decoded = jwt_decode(token)
const { match } = props;
let  { id } = match.params;
console.log('this',id)
console.log('hiiiiii',detail)

useEffect(() => {
    Axios.get(`http://localhost:5000/order/readProductid/${id}`)
        .then(order => {
            setDetail(order.data)
            console.log('hi',order.data)
        })
        .catch(err => {
            console.log('h1',err)
        })
}, [])

const numberFormat = value =>
new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0
}).format(value);

const order = () => {
    return detail.map(newData => {
            return (
            <Card style={{width:"650px",padding:"5px",margin:"5px"}}>
            <div style={{padding:"5px",margin:"5px"}}>
            {newData.products.map(data => (
                <Container style={{margin:"10px"}}>
                        <Row>
                        <Col lg={3}>
                            <img style={{width:"100%"}} src={data.product.image[0]} alt={data.product.brand} />
                            </Col>
                            <Col lg={9}>
                            <span style={{fontSize:"18px"}}><b>{data.product.brand}</b></span><br />
                            <span>{data.product.description}</span><br />
                            <span>Size: {data.size} | qty: {data.qty}</span>
                            <Container>
                                <Row>
                                    <Col lg={9}><hr /></Col><Col lg={3}></Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                    <span>MRP:</span><br />
                                    <span>Item Discount:<span style={{float:"right"}}>(-)</span></span><br />
                                    <span>Cash On Delivery</span>
                                    </Col>
                                    <Col lg={4}>
                                    <span>{numberFormat(Math.floor(data.product.price * data.qty))}</span><br />
                                    <span>{numberFormat(Math.floor((data.product.price / 100)*data.product.offer)*data.qty)}</span><br />
                                    <span>{numberFormat(Math.floor(data.product.price - ((data.product.price / 100)*data.product.offer))*data.qty)}</span>                                    
                                    </Col>
                                    <Col lg={2}></Col>
                                    <hr />
                                </Row>
                                <Row>
                                    <Col lg={9}><hr /></Col><Col lg={3}></Col>
                                </Row>
                                <Row>
                                <Col lg={5}><h5><b>Total</b></h5></Col>
                                <Col lg={5}>
                                    <h5><b>{numberFormat(Math.floor(data.product.price - ((data.product.price / 100)*data.product.offer))*data.qty)}</b></h5>
                                </Col>
                                </Row>
                            </Container>
                            </Col>
                        </Row>
                </Container>
            ))}
            </div>
            </Card> 
        )    
    })
}

return (
<React.Fragment>
    <Container  style={{position:"relative",left:"50px"}}>
         <Row style={{ padding: "50px" }}></Row>
        <Row>
            <Col lg={10} style={{ position:"relative",left:"30px",borderBottom: "1px solid #e5e5e5" }}>
                <h5><b>ACCOUNT</b></h5>
                <p>{decoded.email}</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Container>
                    <Row>
                        <Col lg={3} style={{borderRight: "1px solid #e5e5e5"}}>
                            <SideBar /> 
                        </Col>
                        <Col lg={9} style={{padding:"20px 20px 20px 20px"}}>
                            {order()}
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
        <Row style={{ padding: "50px" }}></Row>
    </Container>
</React.Fragment>
)
}            
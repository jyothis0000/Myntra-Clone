import React, { useEffect, useState } from 'react'
import SideBar from './OrderSiteBar'
import Axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import { toast } from 'react-toastify';

toast.configure();
export default function orderSite(props) {
    const [orderDetail, setOrderDetail] = useState([])
    const [cancel,setCancel] = useState([])
    const [detail,setDetail] = useState([])

    const token = localStorage.usertoken;
    const decoded = jwt_decode(token)
    const { match } = props;
    let { id } = match.params;
    console.log('this', id)
    console.log('hiiiiii', orderDetail)

    useEffect(() => {
        Axios.get(`http://localhost:5000/order/readid/${id}`)
            .then(order => {
                setOrderDetail(order.data)
                console.log('hi', order.data)
            })
            .catch(err => {
                console.log('h1', err)
            })
    }, [detail])

    const numberFormat = value =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0
    }).format(value);

    useEffect(() => {
        if(cancel.length !== 0){
            Axios.put(`http://localhost:5000/order/edit`,{status:"cancel",id:cancel.id})
            .then(order => {
                toast.error(`Order Cancelled`, { autoClose: 2000 });
                props.history.push(`/cart/order`)
                setDetail(order.data)
            })
            .catch(err => {
                console.log('h1', err)
            })
        }
    }, [cancel])

    const order = () => {
        return orderDetail.map(newData => {
            var total = 0;
            var offer = 0;
            var final = 0;
            newData.products.map(data => {
                total = (Math.floor(data.product.price * data.qty) + total)
                offer = (Math.floor(((data.product.price / 100) * data.product.offer) * data.qty) + offer)
                final = ((Math.floor(data.product.price - ((data.product.price / 100) * data.product.offer)) * data.qty) + final)
                return(1)
            })
            return (
                <Card style={{padding:"5%",width:"650px"}}>
                    <h6 style={{fontVariant: "small-caps"}}>Placed On: <b>{newData.date}</b></h6>
                    <h6 style={{fontVariant: "small-caps"}}>Order No: <b>{newData.orderid}</b></h6>
                    <Container style={{position:"relative",left:"-16px"}}>
                        <Row>
                            <Col lg={3}>
                                <h6 style={{fontVariant: "small-caps"}}>Price Details:</h6>
                            </Col>
                            <Col lg={8}>
                                <Container>
                                    <Row>
                                        <Col lg={10}><hr /></Col>
                                    </Row>
                                    <Row>
                                        <Col lg={7}>
                                            <span style={{fontVariant: "small-caps"}}>MRP:</span><br />
                                            <span style={{fontVariant: "small-caps"}}>Item Discount:<span style={{ float: "right" }}>(-)</span></span><br />
                                            <span style={{fontVariant: "small-caps"}}>Cash On Delivery</span>
                                        </Col>
                                        <Col lg={5}>
                                            <span>{numberFormat(total)}</span><br />
                                            <span>{numberFormat(offer)}</span><br />
                                            <span>{numberFormat(final)}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={10}><hr /></Col>
                                    </Row>
                                    <Row>
                                        <Col lg={1}></Col>
                                        <Col lg={5}>
                                            <h5 style={{fontVariant: "small-caps"}}><b>Total</b></h5>
                                        </Col>
                                        <Col lg={4}>
                                            <h5><b>{numberFormat(final)}</b></h5>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                    <h6 style={{color:"Grey",fontVariant: "small-caps"}}><b>Updates sent to:</b></h6>
                    <h6 style={{marginTop:"10px"}}><i class="fa fa-phone-alt"></i><b> {newData.address.phone}</b></h6>
                    <h6><i class="fa fa-envelope"></i><b> {decoded.email}</b></h6>
                    <hr />
                    <h6 style={{color:"Grey",fontVariant: "small-caps"}}><b>Shipping Address:</b></h6>
                    <h5><b>{newData.address.name}</b></h5>
                    <h6 style={{fontVariant: "small-caps"}}>{newData.address.address},{newData.address.locality}</h6>
                    <h6 style={{fontVariant: "small-caps"}}>{newData.address.city},{newData.address.state}-{newData.address.pincode}</h6>
                    <h6 style={{marginTop:"15px",color:"Grey",fontVariant: "small-caps"}}><b>Payment Mode</b></h6>
                    <h6 style={{fontVariant: "small-caps"}}><b>{newData.paymentstatus}</b></h6>
                    <h5 style={{marginTop:"15px",color:"Grey",fontVariant: "small-caps"}}><b>Items in this order</b></h5>
                    {newData.products.map(data => (
                        <Container className="card" style={{ width:"98%",margin: "1%",padding:"2%" }}>
                            <Row>
                                <Col lg={3}>
                                    <img style={{ width: "100%" }} src={data.product.image[0]} alt={data.product.brand} />
                                </Col>
                                <Col lg={9}>
                                    <span><b>{data.product.brand}</b></span><br />
                                    <span>{data.product.description}</span><br />
                                    <span>Size: {data.size} | Qty: {data.qty}</span><br />
                                    <span><b>{numberFormat(data.product.price * data.qty)}</b></span><br />
                                    <span className={newData.status === 'Cancelled' ? "cancel" : "othress"}>{newData.status}</span><span>({newData.date})</span>
                                    <span style={{ float: "right", position: "relative", top: "-40px" }}><a href={`/cart/order/${data._id}`}><i class="fa fa-2x fa-angle-right"></i></a></span>
                                </Col>
                            </Row>
                        </Container>
                        ))}
                        <span>
                                    <Button onClick={() => {setCancel({id:newData._id})}} style={{ position:"relative",top:"15px",margin:"2%",width:"96%"}} variant="outline-danger">Cancel Order</Button>
                            </span>
                </Card>
            )
        })
    }

    return (
        <React.Fragment>
            <Container style={{position:"relative",left:"50px"}}>
                <Row style={{ padding: "50px" }}></Row>
                <Row>
                    <Col lg={10} style={{ position: "relative", left: "30px", borderBottom: "1px solid #e5e5e5" }}>
                        <h5><b>ACCOUNT</b></h5>
                        <p>{decoded.email}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col lg={3} style={{ borderRight: "1px solid #e5e5e5" }}>
                                    <SideBar />
                                </Col>
                                <Col lg={9} style={{ padding: "20px 20px 20px 20px" }}>
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
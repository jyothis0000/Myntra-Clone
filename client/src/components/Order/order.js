import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import SideBar from './OrderSiteBar'
import { toast } from 'react-toastify';

toast.configure();
export default function order() {
    const [orders, setOrders] = useState([])
    const [drop, setDrop] = useState([])
    const [item, setItem] = useState([])
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token)

    useEffect(() => {
        var userid = decoded._id;
        Axios.post('http://localhost:5000/order/read', { id: userid })
            .then(order => {
                console.log(order.data)
                setOrders(order.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [item])

    const numberFormat = value =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        }).format(value);

    useEffect(() => {
        Axios.post(`http://localhost:5000/order/drop`, { id: drop.id })
            .then(order => {
                toast.info(`Order Droped.`, { autoClose: 2000 });
                console.log('hi', order.data)
                setItem(order)
            })
            .catch(err => {
                console.log('h1', err)
            })
    }, [drop])

    const order = (orders) => {
        if (orders.length !== 0) {
            return (
                <span>
                { orders.map(newData => (
                    <Card key={newData._id} style={{ width: "650px", padding: "5px", margin: "5px" }}>
                        <span>
                            <span>Order No:</span>
                            <span>{newData.orderid}</span>
                            <span style={{ position: "relative", top: "5px", left: "340px" }}>
                                {newData.status === "Placed" ? <a href={`/cart/order/detail/${newData._id}`}>
                                    <Button variant="success">Order Details</Button>
                                </a> : <Button variant="danger" onClick={() => { setDrop({ id: newData._id }) }}>Delete Order</Button>}
                            </span>
                        </span>
                        <div style={{ padding: "5px", margin: "5px" }}>
                            {newData.products.map(data => (
                                <Container key={data._id} style={{ margin: "10px" }}>
                                    <Row>
                                        <Col lg={3}>
                                            <img style={{ width: "100%" }} src={data.product.image[0]} alt={data.product.brand} />
                                        </Col>
                                        <Col lg={9}>
                                            <span><b>{data.product.brand}</b></span><br />
                                            <span>{data.product.description}</span><br />
                                            <span>Size: {data.size} | Qty: {data.qty}</span><br />
                                            <span><b>{numberFormat(Math.floor(data.product.price * data.qty))}</b></span><br />
                                            <span className={newData.status === 'cancel' ? "cancel" : "othress"}>{newData.status}</span><span>({newData.date})</span>
                                            <span style={{ float: "right", position: "relative", top: "-40px" }}><a href={`/cart/order/${data._id}`}><i className="fa fa-2x fa-angle-right"></i></a></span>
                                        </Col>
                                    </Row>
                                </Container>
                            ))}
                        </div>
                    </Card>
                ))}
                </span>
            )
        }
        else{
            return (
                <Container>
                    <Row>
                        <Col style={{ padding: "200px 0px 100px 280px", position: "relative", left: "-20px" }}>
                            <i className="fa fa-7x fa-dolly" style={{ color: "rgb(247, 103, 103)", position: "relative", left: "20px" }} aria-hidden="true"></i>
                            <h4 style={{ fontVariant: "small-caps", color: "rgb(247, 103, 103)" }}><b>No Items in Bag.</b></h4>
                            <Button className="addBut" href='/mens-t-shirt' variant="danger">Add More</Button>
                        </Col>
                    </Row>
                </Container>
            )
        }
}

return (

    <React.Fragment>
        <Container style={{ position: "relative", left: "50px" }}>
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
                                {order(orders)}
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
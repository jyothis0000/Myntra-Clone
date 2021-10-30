import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'

export default function Wishlist() {
    const [wish, setWish] = useState([]);
    const [del, setDel] = useState([]);
    const [respo, setRespo] = useState([]);


    useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        axios.post('http://localhost:5000/wish/getuser', { id: decoded._id })
            .then(res => {
                setWish(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [respo])

    useEffect(() => {
        axios.post('http://localhost:5000/wish/wishdelete', { id: del.id })
            .then(res => {
                setRespo(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [del])

    const numberFormat = value =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        }).format(value);

    const wishlist = () => {
        if (wish.length !== 0) {
            return(
                wish.map(wish => (
                    <Col lg={3}>
                        <Card>
                            <img src={wish.product.image[0]} alt={wish.product.brand} style={{ width: "100%" }} />
                            <Card.Body>
                                <p style={{ fontSize: "15px", fontWeight: "600" }}>{wish.product.description}</p>
                                <h6>
                                    <span style={{ fontSize: "18px" }}>{numberFormat(wish.product.price - ((wish.product.price / 100) * wish.product.offer))}</span>
                                    <span style={{ fontSize: "14px", fontWeight: "600", marginLeft: "5px", }}><strike>{numberFormat(wish.product.price)}</strike></span>
                                    <span style={{ fontSize: "14px", fontWeight: "700", marginLeft: "5px", color: "#ff905a" }}>({wish.product.offer} %off)</span>
                                </h6>
                                <Button variant="outline-secondary" onClick={() => { setDel({ id: wish._id }) }} style={{ position: "absolute", top: "5px", right: "5px", width: "30px", height: "30px", borderRadius: "50%" }}>
                                    <span style={{ position: "relative", top: "-5px", right: "3px" }}>X</span>
                                </Button>
                                <hr />
                                <a style={{ margin: "10px 10px 10px 60px", color: "DarkGray" }} href={`/mens-t-shirt/${wish.product.code}`}>
                                    <span>
                                        ADD TO BAG
                            </span>
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                )))
            }
            else{
                return(
                    <React.Fragment>
                    <Col lg={3}></Col>
                    <Col lg={6} style={{height:"500px"}}>
                    <Card style={{padding:"100px 0px 100px 100px"}}>
                    <h5>Any Product Not Found In Your Whislist</h5>
                    <h6>go and add your Fav products</h6>
                    </Card>
                    </Col>
                    <Col lg={3}></Col>
                    </React.Fragment>
                )
            }
        }


    return (
        <React.Fragment>
            <Container style={{ padding: "150px 3px 50px 30px" }}>
                <Row>
                    {wishlist()}
                </Row>
                <Row>

                </Row>
            </Container>
        </React.Fragment>
    )
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from './image'
import jwt_decode from 'jwt-decode'
import $ from 'jquery'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

toast.configure();

const ProductPage = props => {

    const [order, setOrder] = useState([{ "code": "", "size": "" }])
    const [productData, setProductData] = useState([]);
    const [item, setItem] = useState([]);

    const { match } = props;
    let { code } = match.params;

    useEffect(() => {
        axios.get(`http://localhost:5000/allproduct/getById/${code}`)
            .then(res => {
                setProductData(res.data)
                setOrder({ code: `${code}` })
            })
            .catch(err => {
                console.log(err)
            })
    }, [code])

    const numberFormat = value =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0
        }).format(value);

    const addtocard = () => {
        const token = localStorage.usertoken
        if (token === "undefined" || token === undefined || token === null) {
            props.history.push('/login');
            console.log("log");
        }
        else if (token !== "undefined" || token !== undefined || token !== null) {
            const ordersize = `${order.size}`;
            if (ordersize === "undefined" || ordersize === undefined || ordersize === null) {
                toast.error('Please Select the Size', { autoClose: 2000 });
            }
            else if (ordersize !== "undefined" || ordersize !== undefined || ordersize !== null) {
                const decoded = jwt_decode(token)
                var userEmail = decoded.email;
                axios.post('http://localhost:5000/card/add', { code: `${order.code}`, email: userEmail, size: `${order.size}` })
                    .then(res => {
                        toast.success(`${res.data.message}`, { autoClose: 2000 });
                        setItem({ hi: "hi" })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    const addtoWish = () => {
        const token = localStorage.usertoken
        if (token === "undefined" || token === undefined || token === null) {
            toast.error(`Please Login`, { autoClose: 1500 });
            props.history.push('/login');
        }
        else if (token !== "undefined" || token !== undefined || token !== null) {
            const decoded = jwt_decode(token)
            axios.post('http://localhost:5000/wish/add', { product: order.code, user: decoded._id })
                .then(res => {
                    toast.success(`${res.data.message}`, { autoClose: 2000 });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const Button123 = (item) => {
        if (item.length === 0) {
            return (<Button style={{ width: "80%", padding: "5%" }} onClick={addtocard} variant="danger">ADD TO BAG</Button>)
        }
        else if (item.length !== 0) {
            return (<Button href="/cart" style={{ width: "80%", padding: "5%" }} variant="danger">Go TO BAG</Button>)
        }
    }
    $('#selectsize').hide();
    $('#btnSubmit').prop('disabled', true)
    $(".sizeButton").css("background-color", "white");
    $(".sizeButton").css("color", "Teal");
    $(`#${order.size}`).css("background-color", "Teal");
    $(`#${order.size}`).css("color", "white");

    return (
        <div style={{ margin: "100px 0px 0px 0px" }}>

            {productData.map(filter => (
                <Container key={filter.code} fluid={true}>
                    <Row style={{ padding: "0px 0px 0px 38px" }}>
                        <span>
                            <a className="productlink" href="http://localhost:3000">Home/</a>
                            <a className="productlink" href="http://localhost:3000/mens-t-shirt">Mens T-Shirt/</a>
                            <a className="productlink" href={`http://localhost:3000/mens-t-shirt/${filter.code}`}>{filter.productname}</a>
                        </span>
                    </Row>
                    <Row>
                        <Col className="col-lg-7 col-md-12">
                            <Container fluid={true}>
                                <Row>
                                    <Image imagesrc={filter.image} />
                                </Row>
                            </Container>
                        </Col>
                        <Col className="col-lg-4 col-md-12" style={{ padding: "10px 0px" }}>
                            <h4><b>{filter.productname}</b></h4>
                            <h6 style={{ color: "#aeaeae" }}>{filter.description}</h6>
                            <span style={{ padding: "50px 0px 10px 0px" }}><span className="calprice">{numberFormat(Math.floor((filter.price) - (((filter.price) / 100) * (filter.offer))))}</span><span className="realprice">{numberFormat(filter.price)}</span><b className="offerprice">({filter.offer}% OFF)</b></span>
                            <p style={{ color: "LightSeaGreen" }}>inclusive of all taxes</p>
                            <br />
                            <br />
                            <h6>SELECT SIZE:  </h6>
                            {filter.size.map(x => (
                                <Button variant="outline-info" onClick={() => { setOrder({ ...order, size: x }) }} style={{ margin: "5px", borderRadius: "50%", width: "50px", height: "50px" }} className="sizeButton" id={x} >{x}</Button>
                            ))}
                            <br /><br />
                            <Row>
                                <h5 id="selectsize" style={{ padding: "0px 0px 10px 38px", color: "red" }}>Please select the Size</h5>
                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={6}>{Button123(item)}</Col>
                                <Col lg={6} md={6} sm={6}><Button style={{ width: "80%", padding: "5%" }} onClick={addtoWish} variant="outline-primary">WISHLIST</Button></Col>
                            </Row>
                            <br />
                            <br />
                            <h6><b>BEST OFFERS</b></h6>
                            <h6 style={{ marginTop: "15px" }}>Best Price: <span style={{ color: "orange" }}>{numberFormat(filter.price - ((filter.price / 100) * filter.offer))}</span></h6>
                            <ul>
                                <li className="details">Applicable on: Orders above {numberFormat(1499)} (only on first purchase)</li>
                                <li className="details">Coupon code: MYNTRANEWW500</li>
                                <li className="details">Coupon Discount: {numberFormat(500)} off (check cart for final savings)</li>
                            </ul>

                            <hr />
                            <h4>Product Details</h4>
                            <h6 style={{ marginTop: "10px" }}>{filter.description}</h6>
                            <br />
                            <p style={{ marginTop: "10px", fontWeight: "600" }}>Material & Care</p>
                            <p style={{ marginTop: "5px" }}>60% cotton, 40% polyester<br />Machine-wash</p>
                            <br />
                            <h4>Specifications</h4>
                            <Container>
                                <Row>
                                    <Col>
                                        <span className="detailName">Color</span><br />
                                        <span className="detailValue">{filter.color}</span>
                                        <hr />
                                    </Col>
                                    <Col>
                                        <span className="detailName">Brand</span><br />
                                        <span className="detailValue">{filter.productname}</span>
                                        <hr />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <span className="detailName">Sold By</span><br />
                                        <span className="detailValue">{filter.by}</span>
                                        <hr />
                                    </Col>
                                    <Col>
                                        <span className="detailName">Available Sizes</span><br />
                                        <span className="detailValue">{filter.size.map(x => (<span style={{ margin: "5px" }}>{x}</span>))}</span>
                                        <hr />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <span className="detailName">Product Type</span><br />
                                        <span className="detailValue">{filter.producttype}</span>
                                    </Col>
                                    <Col>
                                        <span className="detailName">Name Of The Product</span><br />
                                        <span className="detailValue">{filter.description}</span>
                                    </Col>
                                </Row>
                            </Container>
                            <br />
                            <h4>Delivery Option</h4>
                            <p style={{ margin: "10px 0px 0px 0px" }}>100% Original Products</p>
                            <p>Free Delivery on order above {numberFormat(1199)}</p>
                            <p>Cash on delivery might be available</p>
                            <p>Easy 30 days returns and exchanges</p>
                            <p>Try & Buy might be available</p>
                            <p>Product Code: {filter.code}</p>
                        </Col>
                    </Row>
                </Container>
            ))}
        </div>
    )
}

export default ProductPage;

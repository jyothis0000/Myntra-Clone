import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import jwt_decode from 'jwt-decode'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import {  toast } from 'react-toastify';

toast.configure();

export default function Cart(props) {
  const [cartData, setCartData] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);
  const [item, setItem] = useState([]);
  const [cartCal, setCartCal] = useState([]);
  const [wishList, setWishList] = useState([]);
  var bagPrice = 0;
  var wooBagPrice = 0;
  var offer = 0;
  var bagCount = 0;
  var delivery = 0;
  var lastPrice = 0;
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token)

  useEffect(() => {
    if (deleteItem.id === undefined || deleteItem.id === 'undefined' || deleteItem.id === '' || deleteItem.id === null) { }
    else {
      axios.post("http://localhost:5000/card/cartdelete", { id: deleteItem.id })
        .then(res => {
          setItem(res.data)
          toast.info(`Deleted`,{autoClose:1500});
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [deleteItem])

  useEffect(() => {
    var userid = decoded._id;
    axios.post("http://localhost:5000/card/getuser", { id: userid })
      .then(res => {
        setCartData(res.data)
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

  const onPrice = () => {
    cartData.map(cart => {
      bagCount = bagCount + 1;
      wooBagPrice = ((cart.product.price * cart.qty) + wooBagPrice);
      bagPrice = (((cart.product.price - ((cart.product.price / 100) * cart.product.offer)) * cart.qty) + bagPrice);
      offer = ((((cart.product.price / 100) * cart.product.offer) * cart.qty) + offer);
      if (bagPrice > 4999) {
        delivery = 0;
      }
      else {
        delivery = 149;
      }
      lastPrice = (bagPrice + delivery);
      return (1)
    })
  }

  useEffect(() => {
    if (wishList.length !== 0) {
      axios.post('http://localhost:5000/wish/add', { product: wishList.code, user: decoded._id })
        .then(res => {
          toast.success(`Successfully Added to Whislist`,{autoClose:1500});
          props.history.push(`/wish`)
        })
        .catch(err => {
          console.log(err)
        })

    }
  }, [wishList])



  const cartProducts = (cartData) => {
    if (cartData.length !== 0) {
      return (
        cartData.map(cart => (
          <Row style={{ margin: "10px 0px 10px 0px" }} key={cart._id}>
            <Card>
              <Container fluid={true}>
                <Row>
                  <Col lg={2} style={{ padding: "10px" }}>
                    <img style={{ width: "100%", height: "100%" }} src={cart.product.image[0]} alt="hi" />
                  </Col>
                  <Col lg={10}>
                    <p><b>{cart.product.productname}</b></p>
                    <Container fluid={true}>
                      <Row>
                        <Col><p>{cart.product.description}</p></Col>
                        <Col><span style={{ float: "right", textDecorationLine: "line-through" }}>{numberFormat(cart.product.price)}</span><span style={{ float: "right", margin: "0px 10px 0px 10px" }}> ({cart.product.offer}% OFF)</span></Col>
                      </Row>
                      <Row>
                        <Col><p>Sold by:{cart.product.by}</p></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <select name="size" defaultValue={cart.size} onChange={(e) => { setCartCal({ productCode: cart._id, productSize: (e.target.value) }) }}>
                            {cart.product.size.map(x => {
                              if (cart.size === x) {
                                return (<option value={x} key={x} as="button">{x}</option>)
                              }
                              else {
                                return (<option value={x} key={x} as="button">{x}</option>)
                              }
                            })}
                          </select>
                        </Col>
                        <Col>
                          <select name="quantity" value={cart.qty} onChange={(e) => { setCartCal({ productCode: cart._id, productQty: Number(e.target.value) }) }}>
                            <option value="1" as="button">1</option>
                            <option value="2" as="button">2</option>
                            <option value="3" as="button">3</option>
                            <option value="4" as="button">4</option>
                            <option value="5" as="button">5</option>
                          </select>
                          <span><b> × {numberFormat(Math.floor(cart.product.price - ((cart.product.price / 100) * cart.product.offer)))}</b></span>
                          <span style={{ float: "right" }}><b>{numberFormat(Math.floor(((cart.product.price) - (((cart.product.price) / 100) * (cart.product.offer))) * cart.qty))}</b></span>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Card.Body style={{ border: "1px solid rgba(0,0,0,.125)" }}>
                <Container>
                  <Row>
                    <Col lg={2}>
                      <Button onClick={() => { setDeleteItem({ id: cart._id }) }} style={{ textAline: "center" }}>Remove</Button>
                    </Col>

                    <Col lg={10}>
                      <span>|</span>
                      <Button onClick={() => { setWishList({ code: cart.product.code }) }} style={{ margin: "0px 0px 0px 100px", textAline: "center" }}>Move To Wishlist</Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Row>
        ))
      )
    }
    else {
      $("#calculation").hide();
      delivery = 0;
      return (
        <Row className="card" style={{ margin: "5px 1px 5px 1px", padding: "20px 5px 20px 5px", textAlign: "center" }}>
          <h5>You don't have the products<br />please slect any product</h5>
        </Row>
      )
    }
  }

  const deliverCharge = () => {
    if (delivery === 0) {
      return (<span><span style={{ textDecoration: "line-through" }}>{numberFormat(149)}</span><span style={{ color: "#ff3f6c" }}>FREE</span></span>)
    }
    else {
      return (<span>{numberFormat(149)}</span>)
    }
  }

  const freeEnable = () => {
    if (delivery === 0) {
      return (<span style={{ color: "LimeGreen" }}><i style={{ margin: "0px 10px" }} className="fas fa-shipping-fast"></i><b style={{ marginRight: "5px" }}>Free delivery</b>You gotted the Free Delivery</span>)
    }
    else {
      return (<span style={{ color: "red" }}><i style={{ margin: "0px 10px" }} className="fas fa-shipping-fast"></i><b style={{ marginRight: "5px" }}>Free delivery</b>For the free delivery you want more {numberFormat(5000 - bagPrice)}</span>)
    }
  }

  useEffect(() => {
    if (cartCal.length !== 0) {
      var userid = decoded._id;
      axios.put("http://localhost:5000/card/cartupdate", { user: userid, id: cartCal.productCode, size: cartCal.productSize, qty: cartCal.productQty })
        .then(res => {
          setItem(res.data)
          toast.success(`Successfully Updated`,{autoClose:1500});
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [cartCal])

  const final = (cardData) => {
    if (cardData.length !== 0) {
      return (
        <Container>
          <Row>
            <Col lg={8}>
              <Card>
                <Row>
                  <Col style={{ padding: "20px 0px 20px 30px" }}>
                    <span style={{ margin: "0px 0px 10px 30px" }}><img style={{ width: "40px", height: "40px" }} src="https://bit.ly/32Y5S2N" alt="offer" /><b style={{ margin: "0px 0px 0px 10px" }}>Available Offers</b></span>
                    <ul>
                      <li style={{ margin: "10px 0px 10px 30px" }} className="details">10% Instant Discount on HDFC Bank Credit Cards on a min spend of Rs.5000. TCA</li>
                      <li id="dis" style={{ margin: "0px 0px 10px 30px", display: "none" }} className="details">50% Cashback Voucher of up to Rs.500 on first ever PayPal Transaction. TCA</li>
                    </ul>
                    <Button id="togbut1" style={{ color: "crimson", background: "white", border: "none" }}><i className="fa fa-angle-down"></i>Show More</Button>
                    <Button style={{ color: "crimson", background: "white", border: "none", display: "none" }} id="togbut2"><i className="fa fa-angle-up"></i>Show Less</Button>
                  </Col>
                </Row>
              </Card>
              {onPrice(cartCal.productCode, cartCal.productQty)}
              <Card style={{ margin: "15px 0px", padding: "10px" }}>
                {freeEnable()}
              </Card>
              <Row>
                <Col><span style={{ fontSize: "18px", padding: "0px 5px" }}><b>My Shopping Bag ({bagCount} Item)</b></span></Col>
                <Col><span style={{ float: "right" }}><b>Total:{numberFormat(bagPrice)}</b></span></Col>
              </Row>
              <Row>
                <Container fluid={true}>
                  {cartProducts(cartData)}
                </Container>
              </Row>
              <Card style={{ padding: "10px" }}>
                <Row>
                  <Col style={{ paddingTop: "3px" }}><span>Add More From Wishlist</span></Col>
                  <Col><span style={{ float: "right" }}><i className="fa fa-2x fa-angle-right"></i></span></Col>
                </Row>
              </Card>

            </Col>
            <Col lg={4} style={{ padding: "10px", borderLeft: "1px solid #e5e5e5" }}>
              <span id="calculation">
                <h3 style={{ padding: "5px 5px 5px 16px" }}>Coupons</h3>
                <Row style={{ padding: "5px 5px 5px 16px" }}>
                  <Col>
                    <h6>Apply Coupons</h6>
                  </Col>
                  <Col><Button variant="outline-danger">Apply</Button></Col>
                </Row>
                <hr />
                <p style={{ padding: "5px 5px 5px 16px" }}><b>GIFTING & PERSONILISATION</b></p>
                <hr />
                <b style={{ padding: "5px 5px 5px 16px" }}>PRICE DETAILS</b>
                <Container fluid={true}>
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col>Bag Total</Col>
                    <Col>{numberFormat(wooBagPrice)}</Col>
                  </Row>
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col style={{ color: "green" }}>Bag Discount</Col>
                    <Col style={{ color: "green" }}><span>-{numberFormat(offer)}</span></Col>
                  </Row>
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col>Coupen Discount</Col>
                    <Col style={{ color: "#ff3f6c" }}><span>Apply Coupen</span></Col>
                  </Row>
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col>Order Total</Col>
                    <Col>{numberFormat(bagPrice)}</Col>
                  </Row>
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col>Delivery Charge</Col>
                    <Col>{deliverCharge()}</Col>
                  </Row>
                  <hr />
                  <Row style={{ padding: "5px 5px 5px 0px" }}>
                    <Col><b>Total</b></Col>
                    <Col><b>{numberFormat(lastPrice)}</b></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col><Button href="/cart/address" variant="danger" style={{ width: "80%", margin: "10%" }}>Place Order</Button></Col>
                  </Row>
                </Container>
              </span>
            </Col>
          </Row>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <Row>
            <Col style={{padding:"100px 0px 100px 480px",position:"relative",left:"-20px"}}>
            <i className="fa fa-7x fa-cart-plus" style={{color:"rgb(247, 103, 103)",position:"relative",left:"20px"}} aria-hidden="true"></i>
              <h4 style={{ fontVariant: "small-caps",color:"rgb(247, 103, 103)"}}><b>No Items in Bag.</b></h4>
              <Button  href='/mens-t-shirt' variant="danger" className="addBut">Add More</Button>
            </Col>
          </Row>
        </Container>
      )
    }
  }

  $("#togbut1").click(function () {
    $("#togbut1").hide();
    $("#togbut2").show();
    $("#dis").show();
  });
  $("#togbut2").click(function () {
    $("#togbut2").hide();
    $("#togbut1").show();
    $("#dis").hide();
  });

  return (
    <React.Fragment>
      <div style={{ margin: "100px 0px 0px 0px" }}></div>
      {final(cartData)}
      <div style={{ margin: "0px 0px 50px 0px" }}></div>
    </React.Fragment>
  )
}
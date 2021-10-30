import React from 'react'
import { Row, Col} from 'react-bootstrap'

export default function orderSite() {
return (
<React.Fragment>
    <Row>
        <Col style={{padding:"25px 0px 10px 18px"}}><span style={{color:"DarkGray"}}>Over View</span></Col>
    </Row>
    <hr />
    <Row>
        <Col style={{padding:"25px 0px 10px 18px"}}>
            <p  style={{color:"DarkGray"}}>ORDERS</p>
            <p style={{ color: "MediumSpringGreen" }}><b>Orders & Returns</b></p>
        </Col>
    </Row>
    <hr />
    <Row>
        <Col style={{padding:"25px 0px 10px 18px"}}>
            <p style={{color:"DarkGray"}}>CREDITS</p>
            <span>Coupons</span><br/>
            <span>Myntra Credits</span><br />
            <span>Myntra Points</span>
        </Col>
    </Row>
    <hr />
    <Row>
        <Col style={{padding:"25px 0px 10px 18px"}}>
            <p style={{color:"DarkGray"}}>ACCOUNT</p>
            <span>Profile</span><br />
            <span>Save Cards</span><br />
            <span>Addresses</span><br />
            <span>Myntra Insider</span>
        </Col>
    </Row>
</React.Fragment>            
)
}            
import React, { useState } from "react";
import Butlo from './../button/loginlogout'
import Logo from './../Logo/android-chrome-192x192.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Container,
  Col
} from "reactstrap";
import {
  FormControl,
  InputGroup,
  Modal
} from "react-bootstrap";

const Header = props => {
  const toggle = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);

  const [menShow, setMenShow] = useState(false);
  const [womenShow, setWomenShow] = useState(false);
  const [kidsShow, setKidsShow] = useState(false);
  const [homeShow, setHomeShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);

  return (
    <div>
      <Navbar light expand="md" className="nav-bar123 nav-bar">
        <NavbarBrand href="/">
          <img className="brand" src={Logo} alt="a1" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />  
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="navmw" onMouseOver={() => setMenShow(true)} onMouseOut={() => setMenShow(false)} >
              <NavLink className="links">MEN</NavLink>
            </NavItem>
            <NavItem className="navmw" onMouseOver={() => setWomenShow(true)} onMouseOut={() => setWomenShow(false)}>
              <NavLink className="links">WOMEN</NavLink>
            </NavItem>
            <NavItem className="navmw" onMouseOver={() => setKidsShow(true)} onMouseOut={() => setKidsShow(false)} >
              <NavLink className="links">KIDS</NavLink>
            </NavItem>
            <NavItem className="navmw" onMouseOver={() => setHomeShow(true)} onMouseOut={() => setHomeShow(false)} >
              <NavLink className="links">HOME&FURNITURE</NavLink>
            </NavItem>
            <NavItem className="search">
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="searchbor" placeholder="Search For Products, brands and More" aria-label="Username" aria-describedby="basic-addon1"/>
            </InputGroup>
            </NavItem>
            <NavItem className="logos" onMouseOver={() => setProfileShow(true)} onMouseOut={() => setProfileShow(false)} >
            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </NavItem>
            <NavItem className="logos">
              <a href="">
              <i className="fa fa-bookmark fa-2x" href="/cart/whislist" aria-hidden="true"></i>
              </a>
            </NavItem>
            <NavItem className="logos">
              <a href="/cart">
              <i className="fa fa-shopping-bag fa-2x" aria-hidden="true"></i>
              </a>
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
      <Modal
        className="modal123"
        onMouseOver={() => setMenShow(true)}
        onMouseOut={() => setMenShow(false)}
        size="lg"
        show={menShow}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Body>
          <Container>
            <Row>
              <Col>
              <ul>
                <li><a href="/"><b>Topwear</b></a></li>
                <li><a href="/mens-t-shirt">T-Shirts</a></li>
                <li><a href="/">Casual Shirts</a></li>
                <li><a href="/">Formal Shirts</a></li>
                <li><a href="/">Sweatshirts</a></li>
                <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/mens-bottom-wear"><b>Bottomwear</b></a></li>
              <li><a href="/">Jeans</a></li>
              <li><a href="/">Casual Trousers</a></li>
              <li><a href="/">Formal Trousers</a></li>
              <li><a href="/">Shorts</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Footwear</b></a></li>
              <li><a href="/">Casual Shoes</a></li>
              <li><a href="/">Sports Shoes</a></li>
              <li><a href="/">Formal Shoes</a></li>
              <li><a href="/">Sneakers</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Indian&FestiveWear</b></a></li>
              <li><a href="/">KurtaSets</a></li>
              <li><a href="/">Sherwanis</a></li>
              <li><a href="/">Nehru Jackets</a></li>
              <li><a href="/">Dhotis</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              </Row>

              <Row>
              <Col>
              <ul>
              <li><a href="/"><b>Fashion Accessories</b></a></li>
              <li><a href="/">Wallets</a></li>
              <li><a href="/">Belts</a></li>
              <li><a href="/">Perfumes</a></li>
              <li><a href="/">Trimmers</a></li>
              <li><hr /></li>
              </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal
      className="modal123"
        onMouseOver={() => setWomenShow(true)}
        onMouseOut={() => setWomenShow(false)}
        size="lg"
        show={womenShow}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Body>
        <Container>
            <Row>
              <Col>
              <ul>
                <li><a href="/"><b>Indian&Fusion Wear</b></a></li>
                <li><a href="/">Ethnic Dresses</a></li>
                <li><a href="/">Skirts</a></li>
                <li><a href="/">Lehenga Cholis</a></li>
                <li><a href="/">Dress Materials</a></li>
                <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Western Wear</b></a></li>
              <li><a href="/">Tops&Shirts</a></li>
              <li><a href="/womens-t-shirt">T-Shirts</a></li>
              <li><a href="/womens-bottom-wear">Bottom Wear</a></li>
              <li><a href="/">Jeans</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Footwear</b></a></li>
              <li><a href="/">Casual Shoes</a></li>
              <li><a href="/">Flats</a></li>
              <li><a href="/">Heels</a></li>
              <li><a href="/">Boots</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Beauty & Personal Care</b></a></li>
              <li><a href="/">Makeup</a></li>
              <li><a href="/">Skincare</a></li>
              <li><a href="/">Beauty</a></li>
              <li><a href="/">Lipsticks</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              </Row>
              <Row>
              <Col>
              <ul>
              <li><a href="/"><b>Gadgets</b></a></li>
              <li><a href="/">Smart Wearables</a></li>
              <li><a href="/">Fitness Gadgets</a></li>
              <li><a href="/">Headphones</a></li>
              <li><a href="/">Speakers</a></li>
              <li><hr /></li>
              </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        className="modal123"
        onMouseOver={() => setKidsShow(true)}
        onMouseOut={() => setKidsShow(false)}
        size="lg"
        show={kidsShow}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Body>
        <Container>
            <Row>
              <Col>
              <ul>
                <li><a href="/kids-shirts-pants"><b>Boys Clothing</b></a></li>
                <li><a href="/">T-Shirts</a></li>
                <li><a href="/">Shirts</a></li>
                <li><a href="/">Shorts</a></li>
                <li><a href="/">Jeans</a></li>
                <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/kids-tops-bottom"><b>Girls Clothing</b></a></li>
              <li><a href="/">Dresses</a></li>
              <li><a href="/">Tops</a></li>
              <li><a href="/">Tshirts</a></li>
              <li><a href="/">Clothing Sets</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Boys Footwear</b></a></li>
              <li><a href="/">Casual Shoes</a></li>
              <li><a href="/">Sports Shoes</a></li>
              <li><a href="/">Sandals</a></li>
              <li><a href="/">Flip flops</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/"><b>Girls Footwear</b></a></li>
              <li><a href="/">Flats</a></li>
              <li><a href="/">Casual Shoes</a></li>
              <li><a href="/">Heels</a></li>
              <li><a href="/">Flip flops</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              </Row>
              <Row>
              <Col>
              <ul>
              <li><a href="/"><b>Kids Accessories</b></a></li>
              <li><a href="/">Backpacks</a></li>
              <li><a href="/">Watches</a></li>
              <li><a href="/">Jewellery</a></li>
              <li><a href="/">Eyewear</a></li>
              <li><hr /></li>
              </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        className="modal123"
        onMouseOver={() => setHomeShow(true)}
        onMouseOut={() => setHomeShow(false)}
        size="lg"
        show={homeShow}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Body>
        <Container>
            <Row>
              <Col>
              <ul>
                <li><a href="/home-living-products"><b>Bath</b></a></li>
                <li><a href="/">Bath Towels</a></li>
                <li><a href="/">Face Towels</a></li>
                <li><a href="/">Beach Towels</a></li>
                <li><a href="/">Towels Set</a></li>
                <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/home-living-products"><b>Home Décor</b></a></li>
              <li><a href="/">Planters</a></li>
              <li><a href="/">Aromas</a></li>
              <li><a href="/">Clocks</a></li>
              <li><a href="/">Mirrors</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/home-living-products"><b>Bed Linen & Furnishing</b></a></li>
              <li><a href="/">Bedsheets</a></li>
              <li><a href="/">Bedding Sets</a></li>
              <li><a href="/">Quilts</a></li>
              <li><a href="/">Bed Covers</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              <Col>
              <ul>
              <li><a href="/home-living-products"><b>Kitchen&Table</b></a></li>
              <li><a href="/">Tableware</a></li>
              <li><a href="/">Serveware</a></li>
              <li><a href="/">Kitchen Tools</a></li>
              <li><a href="/">Cookware</a></li>
              <li><a href="/">Furnishings</a></li>
              <li><a href="/">Table Covers</a></li>
              <li><hr /></li>
              </ul>
              </Col>
              </Row>
              <Row>
              <Col>
              <ul>
              <li><a href="/home-living-products"><b>Flooring</b></a></li>
              <li><a href="/">Carpets</a></li>
              <li><a href="/">Floor Mats</a></li>
              <li><a href="/">Dhurries</a></li>
              <li><a href="/">Door Mats</a></li>
              <li><hr /></li>
              </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        className="modal123pro"
        onMouseOver={() => setProfileShow(true)}
        onMouseOut={() => setProfileShow(false)}
        size="sm"
        show={profileShow}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Body>
         <Butlo />
         <hr />
         <a href="/cart/order">Orders</a><br />
         <a href="/cart/whislist">Wishlist</a><br />
         <a href="/">Gift Cards</a><br />
         <a href="/">Contact Us</a><br />
         <a href="/">Myntra Insider</a><br />
         <hr />
         <a href="/">Myntra Credit</a><br />
         <a href="/">Coupons</a><br />
         <a href="/">Saved Cards</a><br />
         <a href="/">Saved Addresses</a><br />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
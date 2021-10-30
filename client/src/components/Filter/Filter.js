import React, { useState, useEffect} from 'react'
import FilterCard from './FilterCard'
import $ from 'jquery'
import axios from 'axios'
import { Button, Container, Col, Row} from 'react-bootstrap';

function Filter() {
    const [filter,setFilter] = useState([]);
    const [filterData,setFilterData] = useState([]);
    
    
    useEffect(() => {
        axios.post("http://localhost:5000/allproduct/filter",{...filterData})
        .then( res => {
            console.log(res)
            setFilter(res.data)
        })
        .catch( err => {
            console.log(err)
        }) 
    },[filterData])


   const clearAll = e => {
    setFilterData({})
    $('.inputradio').prop('checked', false);
    $(".clearbutton").hide(2000);
    $("#sizelist").hide();
    $("#colorlist").hide();
    $("#brandlist").hide();
    $("#pricelist").hide();
   }

   $(".inputradio").click(function(){ $(".clearbutton").show(); });

   $("#sfbutton").click(function(){ $("#sizelist").toggle();$("#colorlist").hide();$("#brandlist").hide();$("#pricelist").hide(); });
   $("#cfbutton").click(function(){ $("#colorlist").toggle();$("#sizelist").hide();$("#brandlist").hide();$("#pricelist").hide(); });
   $("#bfbutton").click(function(){ $("#brandlist").toggle();$("#sizelist").hide();$("#colorlist").hide();$("#pricelist").hide(); });
   $("#pfbutton").click(function(){ $("#pricelist").toggle();$("#sizelist").hide();$("#colorlist").hide();$("#brandlist").hide(); });



   const  handleSizeChange = e => {
            setFilterData({ ...filterData, [e.target.name]: e.target.value });
    };
    const  handleColorChange = e => {
            setFilterData({ ...filterData, [e.target.name]: e.target.value });
    };
    const  handleBrandChange = e => {
            setFilterData({ ...filterData, [e.target.name]: e.target.value });
    };

    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row>
            <Col lg={2}>
              <Container>
                <Row style={{margin:"90px 0px 0px 0px"}}>
                  <label>
                    <div className="clearbutton" style={{display:"none",color:"Crimson",position:"relative",left:"140px"}} onClick={clearAll}>
                      Clear_All
                    </div>
                  </label>
                </Row> 
                <Row style={{margin:"0px 0px 0px 0px"}}>
                  <Col className="col-md-12">
                    <label>
                      <Button style={{width:"112%"}} variant="outline-dark" id="sfbutton" className="caret"><h6><b>Filter By Size <i style={{position:"relative",top:"8px"}} class="fa fa-angle-down fa-2x"></i> </b></h6></Button>
                      <Container  id="sizelist" style={{display:"none",padding:"20px 0px 0px 0px"}}>
                        <Row>
                          <Col>
                            <label className="f-container">XS
                              <input type="radio" className="inputradio" name="size" value="XS" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">S
                              <input type="radio" className="inputradio" name="size" value="S" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">M
                              <input type="radio" className="inputradio" name="size" value="M" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">L
                              <input type="radio" className="inputradio" name="size" value="L" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">XL
                              <input type="radio" className="inputradio" name="size" value="XL" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">XXL
                              <input type="radio" className="inputradio" name="size" value="XXL" onChange={handleSizeChange} />
                              <span className="f-checkmark"></span>
                            </label>
                          </Col>
                        </Row>
                      </Container>
                    </label>
                  </Col>
                </Row>

                <hr/>

                <Row style={{margin:"0px 0px 0px 0px"}}>
                  <Col lg={12} >
                    <label>
                      <Button style={{width:"103%"}} variant="outline-dark" id="cfbutton" className="caret"><h6><b>Filter By Colors <i style={{position:"relative",top:"8px"}} class="fa fa-angle-down fa-2x"></i> </b></h6></Button>
                      <Container  id="colorlist" style={{display:"none",padding:"20px 0px 0px 0px"}}>
                        <Row>
                          <Col>
                            <label className="f-container">Black
                              <input type="radio" className="inputradio" name="color" value="Black" onChange={handleColorChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Blue
                              <input type="radio" className="inputradio" name="color" value="Blue" onChange={handleColorChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Yellow
                              <input type="radio" className="inputradio" name="color" value="Yellow" onChange={handleColorChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Green
                              <input type="radio" className="inputradio" name="color" value="Green" onChange={handleColorChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Red
                              <input type="radio" className="inputradio" name="color" value="Red" onChange={handleColorChange} />
                              <span className="f-checkmark"></span>
                            </label>
                          </Col>
                        </Row>
                      </Container>
                    </label>
                  </Col>
                </Row>

                <hr/>

                <Row style={{margin:"0px 0px 0px 0px"}}>
                  <Col>
                    <label>
                      <Button style={{width:"105%"}} variant="outline-dark" id="bfbutton" className="caret"><h6><b>Filter By Brand<i style={{position:"relative",top:"8px"}} class="fa fa-angle-down fa-2x"></i> </b></h6></Button>
                      <Container  id="brandlist" style={{display:"none",padding:"20px 0px 0px 0px"}}>
                        <Row>
                          <Col>
                            <label className="f-container">Here&Now
                              <input type="radio" className="inputradio" name="brand" value="HERE&NOW" onChange={handleBrandChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Roadstar
                              <input type="radio" className="inputradio" name="brand" value="ROADSTAR" onChange={handleBrandChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Dilliger
                              <input type="radio" className="inputradio" name="brand" value="DILLINGER" onChange={handleBrandChange} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">Rigo
                              <input type="radio" className="inputradio" name="brand" value="RIGO" onChange={handleBrandChange} />
                              <span className="f-checkmark"></span>
                            </label>
                          </Col>
                        </Row>
                      </Container>
                    </label>
                  </Col>
                </Row>

                <hr/>

                <Row style={{margin:"0px 0px 0px 0px"}}>
                  <Col>
                    <label>
                      <Button style={{width:"107%"}} variant="outline-dark" id="pfbutton" className="caret"><h6><b>Filter By Price <i style={{position:"relative",top:"8px"}} class="fa fa-angle-down fa-2x"></i> </b></h6></Button>
                      <Container id="pricelist" style={{display:"none",padding:"20px 0px 0px 0px"}}>
                        <Row>
                          <Col>
                            <label className="f-container">₹.101-₹.500
                              <input type="radio" className="inputradio" name="price" onChange={() =>{setFilterData({ ...filterData, price:{'$gte':100,'$lte':500} })}} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">₹.501-₹.1000
                              <input type="radio" className="inputradio" name="price" onChange={() =>{setFilterData({ ...filterData,price:{'$gte':501,'$lte':1000} })}} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">₹.1001-₹.2000
                              <input type="radio" className="inputradio" name="price" onChange={() =>{setFilterData({ ...filterData,price:{'$gte':1001,'$lte':2000} })}} />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">₹.2001-₹.5000
                              <input type="radio" className="inputradio" name="price" onChange= {() =>{setFilterData({ ...filterData, price:{'$gte':2001,'$lte':5000} })}}  />
                              <span className="f-checkmark"></span>
                            </label>
                            <label className="f-container">₹.5000 above 
                              <input type="radio" className="inputradio" name="price" onChange= {() =>{setFilterData({ ...filterData, price:{'$gte':5001} })}}  />
                              <span className="f-checkmark"></span>
                            </label>
                          </Col>
                        </Row>
                      </Container>
                    </label>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg={9}>
            <Container fluid={true}>
                <Row style={{margin:"90px 0px 50px 0px"}}>
                  {filter.map( filter =>(
                  <FilterCard
                  key={filter.code}
                  code={filter.code} 
                  id={filter.id} 
                  des={filter.description} 
                  name={filter.productname} 
                  size= {filter.size.map(x => ( <span style={{margin:"5px"}}>{ x }</span> ))}
                  price={filter.price} 
                  image={filter.image.map(img => (<img src={img} alt="img" />))} />
                  ))}
                </Row>
                <p>{JSON.stringify()}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
}

export default Filter


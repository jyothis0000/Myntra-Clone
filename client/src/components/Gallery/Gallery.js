import React,{Component} from 'react';
import {
        Container,
        Row} from 'reactstrap'
import Name from './Product';

class Home extends Component {
    constructor() {
        super();
        this.state={
            products:[]
        };
}
componentDidMount() {
    fetch('http://localhost:5000/products/get')
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('images fetched...', products)));
  }
 Products(){
    return this.state.products.map(data => {
        return ( <div key={data.image} className="col-lg-3 col-sm-12 col-md-6">
            <Name link={data.link} image={data.image} name={data.name} hint={data.hint} />
        </div>)
    });
 }

  render() {
      //
      return (
          <Container fluid={true}>
            <Row>
          {this.Products()}
          </Row>
          </Container>
      );
  }
}
export default Home;
